function submitForm() {
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.56.1:8080/pecas/volumeCilindro/" + num1 + "/" + num2, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("calcForm").reset();
            document.getElementById("successMessage").style.display = "block";
        }
    };
    xhr.send();
}