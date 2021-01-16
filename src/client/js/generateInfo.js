export async function generate(event) {
    event.preventDefault();
    console.log("generate is on");

    getData()
    .then((data)=> {
        postData(data)

    })
    .then( () => {
        getProjectData()
    })

}


export async function getData() {



    let destination = document.getElementById("destination").value;
    let departure = document.getElementById("departure").value;
    let comeback = document.querySelector("#comeback").value;


    let regex = new RegExp(/\S/);

    let d = new Date();
    console.log("d", d.toISOString().slice(0, 10), "departure", departure)

    if (destination) {
        if (regex.test(destination)) {
            destination = destination.trim();
            destination = encodeURIComponent(destination);
        } else {
            alert("Destination field cant be empty")
        }
        if (departure) {
            departure = encodeURIComponent(departure);
            if (comeback){
                comeback = encodeURIComponent(comeback);
                if(Date.parse(departure) <= Date.parse(comeback)){
                    if (Date.parse(d.toISOString().slice(0, 10)) <= Date.parse(departure) ) {

                        return {destination: destination, departure: departure,
                                comeback: comeback}
                    }else{
                        alert("The departure date can't be in past.")
                        generate(e)
                    }
                }else{
                    alert("The return date can't be before the end date");
                    generate(e)
                }

            }else{
                alert("Please, fill in the return date")
                generate(e)
            }
        }else{
            alert("Please, fill in the departure date")
            generate(e)
        }
    }else{
        alert("Please,fill in the destination")
        generate(e)
    }
}


export async function postData (data) {
    console.log("data is on")
    if (data !== undefined) {
        const request = await fetch("http://localhost:8000/data", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({data:data})
        })
        try {
            const data = await request.json();
            return data
        }catch(error){
            console.log(error)
        }
    }else{
        console.log("The input information is undefined")
    }
}


export async function getProjectData(){

    console.log("getProjectData is on")
    const request = await fetch("http://localhost:8000/all");
    try{
        const data = request.json();
        Promise.resolve(data)
        .then(function(value){
            let data = value
            return data
        })
            .then((data)=>{
            //console.log("data", data)
            localStorage.setItem("projectData", JSON.stringify(data))
            const projectData = JSON.parse(localStorage.getItem("projectData"))
            return projectData
            })
                .then( async (projectData)=> {
                    //console.log("projectData", projectData)
                    updateUI(projectData)
                })
    }catch(error){
        console.log(error)
    }
}

async function updateUI (projectData) {
  if(projectData){
    let destination = decodeURIComponent(projectData.inputData.destination)
    upperCaseFirstChar(destination)

    .then ((destination)=>{

        const list = document.querySelectorAll(".destination")
        //console.log(list.length, typeof list)
        for (let i = 0; i < list.length; i++) {
            list[i].innerText = destination;
        }


        const pictureDiv = document.querySelector(".picture")
        const url = projectData.picture
        //console.log(url)
        document.querySelector("img").src = url;

        const departure = projectData.inputData.departure.split("-").reverse().join("-");
        document.querySelector(".departure").innerText = departure;

        const comeback = projectData.inputData.comeback.split("-").reverse().join("-");
        document.querySelector(".comeback").innerText = comeback;

        const countdown = document.querySelector("span")

        let d = new Date();
        d = d.toISOString().slice(0, 10)
        const day = projectData.inputData.departure;
        const count = day - d;
        console.log()


    })
  }
}

export async function countdown(projectData) {

}

async function upperCaseFirstChar (string) {
    const words = string.split(" ");

    for ( let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word[0].toUpperCase() + word.slice(1)
        //console.log(word)
        words[i] = word
    }
    //console.log(words)
    return words.join(" ")
}

export { updateUI, upperCaseFirstChar }
