export async function generate() {

    event.preventDefault();
    console.log("generate is on");

    getData()
    .then((data)=> {postData(data)});
}


export async function getData() {

    let destination = document.getElementById("destination").value;
    let departure = document.getElementById("departure").value;
    let comeback = document.querySelector("#comeback").value;

    let regex = new RegExp(/\S/);

    let d = new Date();

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
                    }
                }else{
                    alert("The return date can't be before the end date");
                }

            }else{
                alert("Please, fill in the return date")
            }
        }else{
            alert("Please, fill in the departure date")
        }
    }else{alert("Please,fill in the destination")}
}


export async function postData (data) {
    console.log("data is on", data)
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
