const url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

// Element selection for Dom manipulation
let item = document.getElementsByClassName("item");
let card_image = document.getElementsByClassName("item-img");
let badge_text = document.getElementsByClassName("badge-text");
let product_title = document.getElementsByClassName("product-title");
let vendor = document.getElementsByClassName("vendor");
let price = document.getElementsByClassName("price");
let old_price = document.getElementsByClassName("old-price");
let off_percent = document.getElementsByClassName("off-percent");
let btn1 = document.getElementById("btn-1");
let btn2 = document.getElementById("btn-2");
let btn3 = document.getElementById("btn-3");
// loader element

let loader = document.getElementById("preloader");
window.addEventListener("load", () => {
  loader.style.display = "none";
});

function Showdata(dataobject) {
  for (i in badge_text) {
    let val =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4]
        .badge_text;
    if (val != null) {
      badge_text[i].innerText = val;
      badge_text[i].style.display = "inline-block";
    }
    card_image[i].src =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4].image;
    card_image[i].addEventListener("error", function () {
      card_image[i].src =
        dataobject.categories[parseInt(i / 4)].category_products[
          i % 4
        ].second_image;
    });
    product_title[i].innerText =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4].title;
    vendor[i].innerText =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4].vendor;
    let price_val =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4].price;
    let old_priceval =
      dataobject.categories[parseInt(i / 4)].category_products[i % 4]
        .compare_at_price;
    price[i].innerText = `Rs  ${price_val}.00`;
    old_price[i].innerText = old_priceval + ".00";
    let off = Math.floor(((old_priceval - price_val) / old_priceval) * 100);
    off_percent[i].innerText = `${off > 9 ? off : `0${off}`}% Off`;
    if (i == 11) break;
  }
}

async function fetchData() {
  try {
    const response = await fetch(url);
    console.log(response);
    if (response.status != 200) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching data:", error);
    throw error;
  }
}

async function Getdata() {
  try {
    const dataobject = await fetchData();
    Showdata(dataobject);
  } catch (error) {
    console.log(`Error:- ${error}`);
  }
}
function filter(btn) {
  if (btn === btn1) {
    btn1.innerHTML = "hello";
  }
}
btn1.addEventListener("click", () => {
  for (i in item) {
    if (i < 4) item[i].style.display = "inline-block";
    else item[i].style.display = "none";
    if(i==11) break;
  }
});
btn2.addEventListener("click", () => {
  for (i in item) {
    if (i >= 4 && i < 8) item[i].style.display = "inline-block";
    else item[i].style.display = "none";
    if(i==11) break;
  }
});
btn3.addEventListener("click", () => {
  for (i in item) {
    if (i >= 8 && i < 12) item[i].style.display = "inline-block";
    else item[i].style.display = "none";
    if(i==11) break;
  }
});

for (i in item) {
  if (i >= 4) item[i].style.display = "none";
}
Getdata();
filter();