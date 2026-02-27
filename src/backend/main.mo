import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ShoppingCart = { items : List.List<Stripe.ShoppingItem>; principal : Principal };
  public type ShoppingCartView = { items : [Stripe.ShoppingItem]; principal : Principal };

  let shoppingCarts = Map.empty<Principal, ShoppingCart>();
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public shared ({ caller }) func addShoppingCart(cart : ShoppingCartView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add shopping carts");
    };
    shoppingCarts.add(cart.principal, { principal = cart.principal; items = List.fromArray<Stripe.ShoppingItem>(cart.items) });
  };

  public shared ({ caller }) func uploadShoppingCart(cart : ShoppingCartView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload shopping carts");
    };
    shoppingCarts.add(cart.principal, { principal = cart.principal; items = List.fromArray<Stripe.ShoppingItem>(cart.items) });
  };

  public shared ({ caller }) func deleteShoppingCart(principal : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete shopping carts");
    };
    shoppingCarts.remove(principal);
  };

  public query ({ caller }) func downloadShoppingCart(principal : Principal) : async ?ShoppingCartView {
    if (principal != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own shopping cart");
    };
    switch (shoppingCarts.get(principal)) {
      case (null) { null };
      case (?cart) {
        ?{ principal = cart.principal; items = cart.items.toArray() };
      };
    };
  };

  public shared ({ caller }) func updateShoppingCart(cart : ShoppingCartView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update shopping carts");
    };
    shoppingCarts.add(cart.principal, { principal = cart.principal; items = List.fromArray<Stripe.ShoppingItem>(cart.items) });
  };

  public query func getAllShoppingCarts() : async [ShoppingCartView] {
    shoppingCarts.values().toArray().map<ShoppingCart, ShoppingCartView>(
      func(cart) { { principal = cart.principal; items = cart.items.toArray() } }
    );
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
