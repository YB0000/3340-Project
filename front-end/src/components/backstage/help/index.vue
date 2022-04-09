<template>
  <div>
    <h1 style="text-align: center; margin-top: 20px">Admin Help Documentation</h1>
    <h3 style="margin-top: 10px">1. How to enter the front admin?</h3>
    <p class="count">
      The way to enter the background is to log in to the administrator account in the user interface, place the mouse on the administrator's name and a drop-down box will appear, and select [Go to Backgend].
      </p>
    <br />
    <img src="../../../assets/toht.png" width="100%" height="500px" alt="" />
    <h3 style="margin-top: 10px">2. How to use front admin home page?</h3>
    <p class="count">
      When you enter the front admin home page, you will see the menu bar on the left, and the current weather information in the middle.
    </p>
    <br />
    <img src="../../../assets/htindex.png" width="100%" height="500px" alt="" />
    <h3 style="margin-top: 10px">3. How to add item?</h3>
    <p class="count">
      Click [Product Management] on the left menu bar and click [Add Product] to add products.
    </p>
    <br />
    <img src="../../../assets/sptj.png" width="100%" height="500px" alt="" />
    <h3 style="margin-top: 10px">4. How to modify the product?</h3>
    <p class="count">
      Click [Product Management] on the left menu bar, and click [Modify Product] to perform operations such as removing and removing products and modifying the price name of the product.
    </p>
    <br />
    <img src="../../../assets/spxg.png" width="100%" height="500px" alt="" />
    <h3 style="margin-top: 10px">5. User management</h3>
    <p class="count">
      Click [User Management] on the left menu bar, and click [User Management] to view all user information, and to freeze and unfreeze the user's account.</p>
    <br />
    <img src="../../../assets/yhgl.png" width="100%" height="500px" alt="" />
    <h3 style="margin-top: 10px">6. Order Management</h3>
    <p class="count">
     Click [Order Management] on the left menu bar, and click [Order Management] to view all order status information, and delivery is also in the current menu item.
    </p>
    <br />
    <img src="../../../assets/ddgl.png" width="100%" height="500px" alt="" />
    <div style="height: 80px"></div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    // ...
    //console.log("Enter")

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }
    document.title = "Mall front admin";
    next();
  },
};
</script>

<style scoped>
.count {
  text-indent: 2em;
  margin-top: 5px;
}
</style>