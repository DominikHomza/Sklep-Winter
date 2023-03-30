var sumawsz = 0;

// Function to add a product to the shopping cart
function dodajDoKoszyka(nazwa, cena, ilosc) {
  sumawsz = sumawsz + cena;

  // Get the shopping cart table
  var koszykTable = document.getElementById("koszyk-table");

  // Get the rows of the shopping cart table
  var koszykRows = koszykTable.getElementsByTagName("tr");

  // Loop through the rows to find a matching product
  var znalezionoProdukt = false;
  for (var i = 1; i < koszykRows.length; i++) {
    var koszykRow = koszykRows[i];
    if (koszykRow.getElementsByClassName("nazwa")[0].innerHTML == nazwa) {
      var iloscElement = koszykRow.getElementsByClassName("ilosc")[0];
      iloscElement.innerHTML = parseInt(iloscElement.innerHTML) + ilosc;
      koszykRow.getElementsByClassName("razem")[0].innerHTML = parseFloat(iloscElement.innerHTML) * cena;
      znalezionoProdukt = true;
      break;
    }
  }

  // If the product is not in the shopping cart, add it
  if (!znalezionoProdukt) {
    var koszykRow = document.getElementById("koszyk-row").cloneNode(true);
    koszykRow.style.display = "";
    koszykRow.getElementsByClassName("nazwa")[0].innerHTML = nazwa;
    koszykRow.getElementsByClassName("cena")[0].innerHTML = cena;
    koszykRow.getElementsByClassName("ilosc")[0].innerHTML = ilosc;
    koszykRow.getElementsByClassName("razem")[0].innerHTML = cena;
    koszykTable.getElementsByTagName("tbody")[0].appendChild(koszykRow);
  }

  // Calculate the total price and update the shopping cart
  var suma = 0;
  for (var i = 1; i < koszykRows.length; i++) {
    var koszykRow = koszykRows[i];
    suma += parseFloat(koszykRow.getElementsByClassName("razem")[0].innerHTML);
  }
  document.getElementById("suma").innerHTML = "Suma: " + suma.toFixed(2) + " zł";
  document.getElementById("brak-produktow").style.display = "none";
  
  document.getElementById("suma").innerHTML = "Suma: " + sumawsz;
}

// Initialize the shopping cart table
// document.getElementById("koszyk-row").style.display = "none";
// document.getElementById("brak-produktow").style.display = "";

// Function to show/hide the shopping cart
function pokazKoszyk() {
  var koszyk = document.getElementById("koszyk");
  if (koszyk.style.display === "none") {
    koszyk.style.display = "block";
  } else {
    koszyk.style.display = "none";
  }
}
function zaplac() {
  // Get the shopping cart table
  var koszykTable = document.getElementById("koszyk-table");

  // Check if there are any products in the cart
  if (koszykTable.getElementsByTagName("tr").length <= 1) {
    alert("Brak produktów w koszyku!");
    return;
  }

  // Calculate the total price
  var suma = 0;
  for (var i = 1; i < koszykTable.rows.length; i++) {
    suma += parseFloat(koszykTable.rows[i].cells[3].innerHTML);
  }

  // Calculate the total price with VAT
  var sumaVAT = (sumawsz * 1.23).toFixed(2);

  // Open a new window with the invoice
  var invoiceWindow = window.open("", "Faktura", "width=600,height=800");
  invoiceWindow.document.write("<h1>Faktura</h1>");
  invoiceWindow.document.write("<table>");
  invoiceWindow.document.write("<tr><th>Nazwa produktu</th><th>Cena</th><th>Ilość</th><th>Razem</th></tr>");
  for (var i = 1; i < koszykTable.rows.length; i++) {
    var nazwa = koszykTable.rows[i].cells[0].innerHTML;
    var cena = koszykTable.rows[i].cells[1].innerHTML;
    var ilosc = koszykTable.rows[i].cells[2].innerHTML;
    var razem = koszykTable.rows[i].cells[3].innerHTML;
    invoiceWindow.document.write("<tr><td>" + nazwa + "</td><td>" + cena + "</td><td>" + ilosc + "</td><td>" + razem + "</td></tr>");
  }
  invoiceWindow.document.write("<tr><td colspan='3'>Suma:</td><td>" + sumawsz.toFixed(2) + " zł</td></tr>");
  invoiceWindow.document.write("<tr><td colspan='3'>Podatek VAT (23%):</td><td>" + (sumaVAT - sumawsz).toFixed(2) + " zł</td></tr>");
  invoiceWindow.document.write("<tr><td colspan='3'>Suma brutto:</td><td>" + sumaVAT + " zł</td></tr>");
  invoiceWindow.document.write("</table>");

  // Reset the shopping cart
  koszykTable.getElementsByTagName("tbody")[0].innerHTML = "";
  sumawsz = 0;
  document.getElementById("suma").innerHTML = "Suma: 0.00 zł";
  document.getElementById("suma").innerHTML = "Suma: 0";
  document.getElementById("brak-produktow").style.display = "";
}