$(document).ready(function () {
  $(".header__burger").click(function () {
    $(".header__burger,.nav").toggleClass("active");
    $(".header__burger span").toggleClass("hide");
  });
});
