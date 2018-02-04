// console.log(jQuery, $);

// $(document).ready(function() {
//   $(".enter").click(function() {
//     $(".homeContainer").hide();
//     $(".main").show();
//     $("nav").show();
//   });
// });

function myFunction(x) {
  x.classList.toggle("change");
  $("nav").toggle();
}
