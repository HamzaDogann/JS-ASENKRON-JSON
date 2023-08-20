//! Javascript Senkron olarak çalışır yani yukarıdan aşağıya doğru

//?--- Asenkron progralama ile kısaca sıralamayı biz yönetiriz.


console.log("1.işlem");  //! Aşağıya doğru sırasıyla çalışır.
console.log("2.işlem");
console.log("3.işlem");

//------------------------------------------------

console.log("1.işlem");  //! Aşağıya doğru sırasıyla çalışır.
setTimeout(() => {
    console.log("2.işlem");  //---> 1 Saniye sonra çalıştır dedik.
}, 1000);
console.log("3.işlem");

//? Sonuc olarak 1 - 3 - 2 sıralamasında olacaktır.

//------------------------------------------------

//!------ CALLBACK FUNCTION -------//

function merhabaYaz(name, callback) {  //--> name ve callback adın 2 tane değer almak istiyoruz.
    console.log(`Merhaba ${name}`);
    callback();
}

function selamYaz() {
    console.log("Görüşürüz!")
}


merhabaYaz("hamza", selamYaz);  //--> merhabaYaz Fonksiyonumuza istediği 2 değeri gönderdik. 

//! Başka bir callback örnek

function meyveleriyazdir(array, callback) {  //--> 2 Değer aldık
    for (const item of array) {
        callback(item)   //--> EkranaYazdir fonksiyonumuz aslında budur. Meyveler dizisindeki her bir meyveyi item adıyla gönderdik.
    }
}

function EkranaYazdir(item) {
    console.log(`Meyve : ${item}`)
}

const meyveler = ["Elma", "Portakal", "Muz", "Çilek", "Karpuz"]

meyveleriyazdir(meyveler, EkranaYazdir);









//? ------ AJAX VE HTTP İstekleri ----------//

//? AJAX ile HTTP isteklerimizi gönderebiliriz ve bunların kullanım yolları vardır işte istek olayları için bilmeniz gerekenler;


// GET   ---> Veriyi almak için kullanıdığımız kod parçacığı. "Get" yani getir demiş oluyoruz.

// POST  ---> Veri gönderme işlemlerinde kullandığımız kod parçacığıdır. Post yani içerik göndermiş oluruz.

// PUT   ---> Verileri güncellemek için kullanabiliriz.

// DELETE --> Var olan değerleri silmek yani yok etmek için kullandığımız kod parçacığıdır.

//! Bilmen gereken şey : "JSON" --> JavaScript Nesnesi şeklinde göstermek yani (Diziler,objeler,veri türleri....)

//?------------------------------------------------------------------------------------------------------------

//! İlk isteğimizi oluşturmaya başlayalım.

const xhr = new XMLHttpRequest(); //--> Yeni bir istek sınıfı oluşturduk artık xhr adıyla kullanabileceğiz.

xhr.open("GET", "https://jsonplaceholder.typicode.com/users"); //---> Json formatında usersleri al demiş oluyoruz.

xhr.onload = function () { //--> xhr verileri yüklendiğinde bu functionu çalıştır dedik.
    const response = xhr.responseText; //-- > gelen isteğimizden responseText içerisindeki verileri çektik ve response ye atadık.
    //! console.log(response) //--> Eğer bu şekilde yapsaydık veriler string türüyle gelirdi ancak bizim verileri json formatına çevirmememiz gerekir
    console.log(JSON.parse(response));
}
xhr.send();

//?------------------------------------------------------------------------------------------------------------

//! Bazı "Status" yani durumlar vardır.

//? 200 = başarılı demektir
// 204: İçerik Yok (No Content)
// 301: Kalıcı Olarak Taşındı (Moved Permanently)
// 400: Geçersiz İstek (Bad Request)
//!404: Bulunamadı (Not Found)
// 500: Sunucu Hatası (Internal Server Error)
// 503: Hizmet Dışı (Service Unavailable)
//todo = Başlıca Status kodları bu şekildeydi.


//?-----------------------------------------------------


const XMR = new XMLHttpRequest();

XMR.open("GET", "https://jsonplaceholder.typicode.com/users");

XMR.onload = function () {
    const response = xhr.responseText;

    if (XMR.status === 200) {  //--> Durum başarı ise işlemleri yapacaktır.
        console.log(JSON.parse(response));
    }
    else { //! İşlem başarısız ise yapılacak işlemler...
        alert("İşlem Başarısız." + XMR.status) // işlem başarısız ve hata kodunu yazdırdık.
    }
}
XMR.send();


//?-----------------------------------------------------


//! Promise  -->  asenkron işlemleri daha düzenli bir şekilde yönetmek ve daha okunabilir kod yazmak için kullanılan bir yapıdır. 

//? Mantığını anlamak

const number = Math.floor(Math.random() * 100)
if (number % 2 === 0) {
    console.log(number, ' Sayı çift!');
}
else {
    console.log(number, ' Sayı tek!');
}

//?-----------------------------------------------------


function getRandomNumber() {
    return new Promise((resolve, reject) => { // resolve = true reject = false gibi düşünebiliriz. başarılı başarısız anlamında kullanılır
        const number = Math.floor(Math.random() * 100)
        if (number % 2 === 0) {
            resolve(number)
        }
        else {
            console.log(number, ' Sayı tek!');
            reject(number)
        }
    })
}

//! .then() --> işlem resolve çözümlendi.
//! .catch() --> işlem reject ise yani çözümlenmediyse

getRandomNumber()
    .then((number) => console.log("Çözümlendi: " + number))
    .catch((error) => console.log('error'));

//number işlemini then ile işlem başarılı ise yapılacak işlemleri yaptırdık sonrasında eğer getRandomNumber reject döndüyse catch bloğumuz çalışır.



//?--------------------------------------------------------------------

//! Fetch ---> Ajax ve Promise kavramlarından pratik bir yol 


fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


//?--------------------------------------------------------------------

//! Async / Await  
//daha sağlıklı olabilecek başka bir yöntemdir. Güncel bir yöntem.


async function getData() {    //--> async(asenkron) bir fonksiyon tanımladık
    const rsp = await fetch("https://jsonplaceholder.typicode.com/users")   //! await kullanmamızın amacı veriyi al "bi bekle" demek
    const datanew = await rsp.json();   //! rsp ye tam olarak gelen veriyi json formatına çevir ve yine bekle(işlemin tamamlanmasını) ve tamamlandıktan sonra datanew değişkenine gönder.
    console.log(datanew);   // ve gelen veriyi konsola yazdır.
}
getData();

///////////////////////////////////////////////////////////////////////

//! then ve catch mantığı ile de birleştirebiliriz.

async function getData() {   // aynı şekilde asycn fonksiyonumuzu tanımladık
    try {  //----> "dene" burası başarılı bölge alanıdır.
        const rsp = await fetch("https://jsonplaceholder.typicode.com/users")
        const datanew = await rsp.json();
        console.log(datanew);

    } catch (error) { //"hatayakalama" burası başarısız olan istek alanıdır.
        console.log(error)
    }
}


getData()




//! Ve veri çekme örnekleri ile pratiğimizi yapalım

// -> DataRequest.js
