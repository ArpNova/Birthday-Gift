
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function changeColor() {
    var color = getRandomColor();
    $moth = $("#shape-moth");
    $("#main", $moth).attr("style", "fill:" + color);
  }



button.onclick = () => {
window.location.href = "../Main-Project/index1.html";
};