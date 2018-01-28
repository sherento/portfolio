console.log(jQuery, $);

$(document).ready(function() {
  $(".enter").click(function() {
    $(".homeContainer").hide();
    $(".main").show();
  });
});
