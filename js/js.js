window.addEventListener(
  `resize`,
  (event) => {
    let headerHeight = $(".header").outerHeight();
    document
      .querySelector(":root")
      .style.setProperty("--header-height", headerHeight + "px");
  },
  false
);

document.addEventListener("DOMContentLoaded", () => {
  // Піца клієнта
  const clientPizza = {
    size: null,
    sauce: [],
    nameSauce: [],
    topping: [],
    nameTopping: [],
    price: 0,
  };

  //Вартість піци
  const pricePizza = {
    largePizza: 200,
    middlePizza: 150,
    smallPizza: 100,
    ketchup: 10,
    bbq: 10,
    ricotta: 10,
    ordinaryCheese: 25,
    fetaCheese: 25,
    mozzarellaCheese: 25,
    meat: 50,
    tomatoes: 15,
    mushroom: 15,
  };

  let inputRadio = document.querySelectorAll(".radioIn");
  inputRadio.forEach((e) => {
    e.addEventListener("click", () => {
      clientPizza.size = e.value;
      console.dir(clientPizza.size);
      myPizza();
    });
  });

  function costPizza() {
    clientPizza.price = 0;
    if (clientPizza.size) {
      if (clientPizza.size === "small") {
        clientPizza.price += pricePizza.smallPizza;
      }
      if (clientPizza.size === "mid") {
        clientPizza.price += pricePizza.middlePizza;
      }
      if (clientPizza.size === "big") {
        clientPizza.price += pricePizza.largePizza;
      }
    }

    clientPizza.sauce.forEach((element) => {
      if (element === "sauceClassic") {
        clientPizza.price += pricePizza.ketchup;
      }
      if (element === "sauceBBQ") {
        clientPizza.price += pricePizza.bbq;
      }
      if (element === "sauceRikotta") {
        clientPizza.price += pricePizza.ricotta;
      }
    });

    clientPizza.topping.forEach((element) => {
      if (element === "moc1") {
        clientPizza.price += pricePizza.ordinaryCheese;
      }
      if (element === "moc2") {
        clientPizza.price += pricePizza.fetaCheese;
      }
      if (element === "moc3") {
        clientPizza.price += pricePizza.mozzarellaCheese;
      }
      if (element === "telya") {
        clientPizza.price += pricePizza.meat;
      }
      if (element === "vetch1") {
        clientPizza.price += pricePizza.tomatoes;
      }
      if (element === "vetch2") {
        clientPizza.price += pricePizza.mushroom;
      }
    });
    console.dir(clientPizza.price);
  }

  function priceDiscount() {
    clientPizza.price = clientPizza.price - clientPizza.price * 0.3;
    document.querySelector(
      ".price > p"
    ).textContent = `You got a 30% discount. New price is: ${clientPizza.price} UAH`;
  }

  const banner = document.querySelector("#getBtn");
  banner.addEventListener("click", priceDiscount);

  function price() {
    if (clientPizza.price !== 0) {
      document.querySelector(
        ".price > p"
      ).textContent = `Price: ${clientPizza.price} UAH`;
    } else document.querySelector(".price > p").textContent = `Price:`;
  }

  function sauces() {
    document.querySelector(
      ".sauces > p"
    ).textContent = `Sauces: ${clientPizza.nameSauce.join(", ")}`;
  }

  function topings() {
    document.querySelector(
      ".topings > p"
    ).textContent = `Toppings: ${clientPizza.nameTopping.join(", ")}`;
  }

  function myPizza() {
    costPizza();
    price();
    sauces();
    topings();
  }

  const dragAndDrop = () => {
    const defaultPizza = document.querySelector(".table-wrapper .table");

    // dragstart - викликається з самого початку переносу елементу що перетягують.

    function dragStart(e) {
      const ingridient = e.target.dataset.key;
      if (ingridient === "sauce") {
        if (!clientPizza.nameSauce.includes(e.target.alt)) {
          clientPizza.nameSauce.push(e.target.alt);
          clientPizza.sauce.push(e.target.id);
        }
      }
      if (ingridient === "topping") {
        if (!clientPizza.nameTopping.includes(e.target.alt)) {
          clientPizza.nameTopping.push(e.target.alt);
          clientPizza.topping.push(e.target.id);
        }
      }
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("img", this.attributes.src.textContent);
    }

    // dragend - викликається в кінці події перетягування - успішної та відміненної.

    function dragEnd(e) {
      defaultPizza.classList.remove("hovered");
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    // dragenter - виконується, коли об`єкт, що перетягують потрапляє в область цільового елементу.

    function dragEnter(e) {
      defaultPizza.classList.add("hovered");
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    // dragleave - виконується, коли об`єкт, що перетягують покидає область цільового елементу.

    function dragLeave(e) {
      defaultPizza.classList.remove("hovered");
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    // dragover - виконується, коли елемент, що перетягують знаходиться над цільовим елементом.

    function dragOver(e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    // drop - викликається, коли подія перетягування завершується відпусканням елементу над цільовим елементом.

    function drop(e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();

      const imgIngridient = document.createElement("img");
      imgIngridient.setAttribute("src", e.dataTransfer.getData("img"));
      defaultPizza.append(imgIngridient);
      myPizza();
    }

    defaultPizza.addEventListener("dragover", dragOver);
    defaultPizza.addEventListener("drop", drop);
    defaultPizza.addEventListener("dragenter", dragEnter);
    defaultPizza.addEventListener("dragleave", dragLeave);

    const ingridients = document.querySelectorAll(".ingridients .draggable");
    ingridients.forEach((ingridient) => {
      ingridient.addEventListener("dragstart", dragStart);
      ingridient.addEventListener("dragend", dragEnd);
    });
  };
  dragAndDrop();

  const forms = document.forms[1];
  let resetButton = document.querySelector("[type=reset]");
  resetButton.addEventListener("mousedown", (e) => {
    e.target.classList.add("buttonclick");
  });
  resetButton.addEventListener("mouseup", (e) => {
    e.target.classList.remove("buttonclick");
  });

  forms.addEventListener("reset", () => {
    clientPizza.size = null;
    clientPizza.sauce = [];
    clientPizza.nameSauce = [];
    clientPizza.topping = [];
    clientPizza.nameTopping = [];
    clientPizza.price = 0;

    const ingridients = document.querySelectorAll(".table img");
    ingridients.forEach((ingridient) => {
      if (!ingridient.alt[0]) {
        ingridient.remove();
      }
    });
    for (let i = 0; i < forms.length; i++) {
      if (
        forms[i].type === "text" ||
        forms[i].type === "tel" ||
        forms[i].type === "email"
      ) {
        forms[i].classList.add("default");
        forms[i].classList.remove("error");
        forms[i].classList.remove("success");
      }
    }
    myPizza();
  });

  const submitButton = document.querySelector("[type=submit]");
  let flagCheck = false;
  submitButton.addEventListener("mousedown", (e) => {
    e.target.classList.add("buttonclick");
  });
  submitButton.addEventListener("mouseup", (e) => {
    e.target.classList.remove("buttonclick");
  });
  forms.addEventListener("submit", formValidate);
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("change", validateInput);
  }

  function validateInput() {
    if (this.type === "text") {
      if (/^[a-zA-Z- ]+$/.test(this.value) === true) {
        this.classList.remove("error");
        this.classList.remove("default");
        this.classList.add("success");
        flagCheck = true;
      } else {
        this.classList.remove("success");
        this.classList.remove("default");
        this.classList.add("error");
        flagCheck = false;
      }
    }
    if (this.type === "tel") {
      if (/^\+380[0-9]{9}$/.test(this.value) === true) {
        this.classList.remove("error");
        this.classList.add("success");
        this.classList.remove("default");
        flagCheck = true;
      } else {
        this.classList.remove("success");
        this.classList.add("error");
        this.classList.remove("default");
        flagCheck = false;
      }
    }

    if (this.type === "email") {
      if (/\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/.test(this.value) === true) {
        this.classList.remove("error");
        this.classList.add("success");
        this.classList.remove("default");
        flagCheck = true;
      } else {
        this.classList.remove("success");
        this.classList.add("error");
        this.classList.remove("default");
        flagCheck = false;
      }
    }
  }
  function formValidate(e) {
    e.preventDefault();
    if (flagCheck === true && clientPizza.size !== null) {
      window.location.href = "./thank-you.html";
    } else if (flagCheck === true && clientPizza.size === null) {
      console.log("errorSize");
      alert("А вибрати розмір піци?!");
    } else if (flagCheck === false && clientPizza.size !== null) {
      console.log("errorvalid");
      alert("Форма відправки заповнена не правильно!");
    }
  }
});
