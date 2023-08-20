// //! Fetch API kullanarak JSON verilerimizi çekeceğiz.


var data = fetch("veri.json")
.then(response=> response.json())
.then(verilerimiz=>{
    console.log(verilerimiz.kullanicilar)
    console.log(verilerimiz.yetki)

    const kullanici1 = JSON.stringify(verilerimiz.kullanicilar[1])
    console.log(`Selamlar = ${kullanici1} `);

    var stringveriler = JSON.stringify(verilerimiz);
    console.log(stringveriler), console.log(typeof stringveriler)
})


//! Async await yapısı verileri çekmeyi deneyelim


    async function getData() {
        try {
            const newdata = await fetch("veri.json")
            const data2 = await newdata.json()

          let isimyas = (data2.kullanicilar[2].name +" "+data2.kullanicilar[2].age)
          console.log(`Hoşgeldin ${isimyas}`)
        } catch (error) {
            console.log("Bir hata meydana geldi"+error)
        }
        
    }

getData()
