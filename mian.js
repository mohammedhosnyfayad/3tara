let navLinks = document.querySelector("nav .links");
let barsIcon = document.querySelector(".bars-icon");

barsIcon.onclick = function () {
  navLinks.classList.toggle("hide");
};

let right = document.querySelector(".right");
let left = document.querySelector(".left");
window.addEventListener("scroll", function () {
  if (this.scrollY >= 400) {
    right.classList.add("top");
    left.classList.add("top");
  }
});

// let pn = document.querySelector(".pric-num").textContent;
// let pn2 = pn.split("جم").join("");
// console.log(+pn2);

let PriceOrder = document.querySelectorAll(".price-order");

PriceOrder.forEach(function (e) {
  e.addEventListener("click", function () {
    let one = e.closest(".box-product");
    let span = one.querySelector("span").textContent;
    let PricSpan = +span.split("جم").join(""); // the price is the true
    let input = document.createElement("input");
    let pTotal = document.createElement("p");
    let p = document.createElement("p");
    let pRemove = document.createElement("p");
    let Textp = document.createTextNode("ادخل الكميه المراد شرائها بالجرام");
    let RemoveText = document.createTextNode("الغاء العمليه الحسابيه");
    let TextTotal = document.createTextNode("");
    let div = document.createElement("div");

    p.className = "textInput";
    input.type = "text";
    input.className = "inputPrice";
    pRemove.className = "remove";
    input.placeholder = "ادخل الكميه بالجرام مثل : 100";
    pRemove.appendChild(RemoveText);
    p.appendChild(Textp);
    pTotal.appendChild(TextTotal);
    one.appendChild(div);
    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(pTotal);
    div.appendChild(pRemove);
    e.disabled = true;

    input.addEventListener("input", function (n) {
      let math = (PricSpan / 1000) * input.value;
      let resulte = math;
      TextTotal.textContent = `السعر هو ${resulte} جنيه`;
      if (isNaN(resulte)) {
        TextTotal.textContent = `الرجاء ادخال رقم `;
      }
    });
    pRemove.addEventListener("click", function () {
      div.remove();
      e.disabled = false;
    });
  });
});

let executed = false;

window.addEventListener("scroll", function () {
  if (!executed && this.scrollY >= 2000) {
    let DivVideo = this.document.createElement("div");
    let videoShow = this.document.querySelector(".video-show");
    let ovrelay = this.document.createElement("div");
    let img = this.document.createElement("img");
    let h1 = this.document.createElement("h1");
    let h1Text = this.document.createTextNode("شرح العمليه الحسابيه");
    let video = this.document.createElement("video");

    img.src = "delete.png";
    video.poster = "cover.png";
    video.src = "Maht.mp4";
    video.autoplay = true;
    DivVideo.className = "video";
    ovrelay.className = "ovrelay";
    video.controls = true;
    ovrelay.appendChild(h1);
    ovrelay.appendChild(img);

    h1.appendChild(h1Text);
    ovrelay.appendChild(video);
    DivVideo.appendChild(ovrelay);
    this.document.body.appendChild(DivVideo);
    img.onclick = function () {
      DivVideo.style.display = "none";
    };
    videoShow.onclick = function () {
      DivVideo.style.display = "flex";
    };

    executed = true; // منع التشغيل مرة أخرى
  }
});
// if (this.scrollY >= 2000) {
//   let video = document.querySelector(".video");
//   let remove = document.querySelector(".remove");
//   let videoShow = document.querySelector(".video-show");
//   video.style.display = "flex";
//   remove.onclick = function () {
//     video.remove();
//   };
// }

let boxRec = document.querySelectorAll(".box-rec .card");

boxRec.forEach(function (e) {
  e.addEventListener("click", function () {
    let one = e.querySelector(".text-rec");
    let two = e.querySelectorAll(".delete");

    one.style.display = "block";
    one.classList.add("tr");

    // استخدم أقرب عنصر أعلى يحتوي على `delete` لضبط الحدث بشكل ديناميكي
    e.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete")) {
        one.classList.remove("tr");
      }
    });
  });
});
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const statusMsg = document.getElementById("statusMsg");

  submitBtn.disabled = true;
  statusMsg.textContent = "جاري الإرسال...";

  let formData = new FormData(this);
  let params = new URLSearchParams(formData).toString();

  fetch(
    "https://script.google.com/macros/s/AKfycbydo4V_PUX58qxtKG9Kqr56Nyx_AjHlE0EXao6GmHNPqSd3QNmHjiRB_IOZolWYx4IU/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      statusMsg.textContent = "تم الإرسال بنجاح ✅";
      document.getElementById("myForm").reset();
      submitBtn.disabled = false;
    })
    .catch((error) => {
      statusMsg.textContent = "حصل خطأ، حاول تاني ❌";
      console.error("خطأ:", error);
      submitBtn.disabled = false;
    });
});
