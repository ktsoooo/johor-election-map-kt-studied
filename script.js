let geojson;
let selectedLayer = null;
let features = [];
let currentField = "PRN2026";

// 1. Create the map
const map = L.map('map')

// 2. Basemap
const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: '&copy; Esri'
    }
);

const labels = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: '&copy; Esri'
    }
);

const satelliteWithLabels = L.layerGroup([
    satellite,
    labels
]);

const electionFields = {

    "2022":"PRU2022",

    "2026":"PRN2026"

};

satelliteWithLabels.addTo(map);

L.control.layers(
    {
        "OpenStreetMap": osm,
        "Satellite": satelliteWithLabels
    }
).addTo(map);

// 3. Helper functions
function getColor(party) {

    switch(party) {

        case "BN":
            return "#002673";

        case "PH":
            return "#E60000";

        case "PN":
            return "#004C73";
        
        case "MUDA":
            return "#000000";

        default:
            return "#cccccc";  
    }

}

function getPartyLogo(party){

    switch(party){

        case "AMANAH":
            return "logo/AMANAH.png";

        case "BERSATU":
            return "logo/BERSATU.png";

        case "DAP":
            return "logo/DAP.png";

        case "MCA":
            return "logo/MCA.png";

        case "MIC":
            return "logo/MIC.png";

        case "MUDA":
            return "logo/MUDA.png";
        
        case "Muda":
            return "logo/MUDA.png";

        case "PAS":
            return "logo/PAS.png";

        case "PKR":
            return "logo/PKR.png";

        case "UMNO":
            return "logo/UMNO.png";

        case "PH-AMANAH":
            return "logo/AMANAH.png";

        case "PH-Amanah":
            return "logo/AMANAH.png";

        case "PN-Bersatu":
            return "logo/BERSATU.png";

        case "PH-DAP":
            return "logo/DAP.png";

        case "BN-MCA":
            return "logo/MCA.png";

        case "BN-MIC":
            return "logo/MIC.png";

        case "PN-PAS":
            return "logo/PAS.png";

        case "PN-Pas":
            return "logo/PAS.png";

        case "PH-PKR":
            return "logo/PKR.png";

        case "BN-UMNO":
            return "logo/UMNO.png";

        case "BERJASA":
            return "logo/BERJASA.png";

        case "PN-MIPP":
          return "logo/MIPP.png";  

        case "PN-GERAKAN":
          return "logo/GERAKAN.png"; 

        case "ASLI":
          return "logo/ASLI.png";

        case "PN-WAWASAN":
          return "logo/WAWASAN.png";

        case "BEBAS":
          return "logo/BEBAS.png";

        case "PSM":
          return "logo/PSM.png";

        case "Bersama":
          return "logo/BERSAMA.png";

        case "Bebas-Kereta Api":
          return "logo/BebasKA.png";
          
        case "Bebas-Kunci":
          return "logo/BebasK.png";
          
        case "Bebas-Pen":
          return "logo/BebasP.png";
          
        case "Bebas-Gajah":
          return "logo/BebasG.png";

        case "PN-Pejuang":
          return "logo/PEJUANG.png";

        default:
          return "logo/NONE.png";

    }

}

function getPartyLogo2(party){

    switch(party){

        case "PH":
          return "logo/PH.png";

        case "BN":
          return "logo/BN.png";
        
        case "PN":
          return "logo/PN.png";

        case "MUDA":
          return "logo/MUDA.png";
    }

}

function getWin(CalonWin){

    switch(CalonWin){

        case "YES":
          return "logo/WIN.png";

        default:
          return "logo/NONE.png";

    }
}


function style(feature) {

    return {

        fillColor:getColor(feature.properties[currentField]),
        weight: 1,
        color: "#ffffff",
        fillOpacity: 0.6

    };

}

function updateInfo(properties){

    if(!properties){

        document.getElementById("info").innerHTML=
        "<h3>DUN</h3>Select a polygon.";

        return;
    }

    document.getElementById("info").innerHTML=`

        <h4>${properties.KOD_DUN} ${properties.NAMA_DUN}</h4>
        
        <h3>Johor Election 2026</h3>
        
        <h4><img src="${getPartyLogo2(properties.PRN2026)}" class="party-logo2"></h4>
        


        <table>

            <tr>
                <td>1&nbsp;&nbsp
                <img src="${getPartyLogo(properties.Calon1Part)}" class="party-logo">
                ${properties.Calon1Part} 
                <br>
                ${properties.Calon1}</td>
                <td><img src="${getWin(properties.Calon1Win)}" class="Win-logo"></td>
                <td>${properties.Calon1Und}</td>
            </tr>

            <tr>
                <td>2&nbsp;&nbsp
                <img src="${getPartyLogo(properties.Calon2Part)}" class="party-logo">
                ${properties.Calon2Part} 
                <br>
                ${properties.Calon2}
                </td>
                <td><img src="${getWin(properties.Calon2Win)}" class="Win-logo"></td>
                <td>${properties.Calon2Und}</td>
            </tr>

            ${properties.Calon3Und > 0 ? `
            <tr>
                <td>3&nbsp;&nbsp
                <img src="${getPartyLogo(properties.Calon3Part)}" class="party-logo">
                ${properties.Calon3Part}
                <br> 
                ${properties.Calon3}
                </td>
                <td><img src="${getWin(properties.Calon3Win)}" class="Win-logo"></td>
                <td>${properties.Calon3Und}</td>
            </tr>
            ` : ""}                

            ${properties.Calon4Und > 0 ? `
            <tr>
                <td>4&nbsp;&nbsp
                <img src="${getPartyLogo(properties.Calon4Part)}" class="party-logo">
                ${properties.Calon4Part} 
                <br>
                ${properties.Calon4}
                </td>
                <td><img src="${getWin(properties.Calon4Win)}" class="Win-logo"></td>
                <td>${properties.Calon4Und}</td>
            </tr>
        ` : ""}            

            ${properties.Calon5Und > 0 ? `      
            <tr>
                <td>5&nbsp;&nbsp
                <img src="${getPartyLogo(properties.Calon5Part)}" class="party-logo">
                ${properties.Calon5Part} 
                <br>
                ${properties.Calon5}
                </td>
                <td><img src="${getWin(properties.Calon5Win)}" class="Win-logo"></td>
                <td>${properties.Calon5Und}</td>
            </tr>
        ` : ""}     

        </table>

        <table>
            
            <tr>
                <th>Majority Votes</th>
                <td>
                    ${properties.Major2026}
                </td>
            </tr>

            <tr>
                <th>Registered Voters</th>
                <td>
                    ${properties.PemilihBer}
                </td>
            </tr>

            <tr>
                <th>Total Counted Votes</th>
                <td>
                    ${properties.TotalVotes}
                </td>
            </tr>

            <tr>
                <th>Missing Votes</th>
                <td>
                    ${properties.MissingVot}
                </td>
            </tr>

        </table>

        <h3>Johor Election 2022</h3>

        <h4><img src="${getPartyLogo2(properties.PRU2022)}" class="party-logo2"></h4>

        <table>

            <tr>
                <th>Party</th>
                <td>
                    <img src="${getPartyLogo(properties.Parti)}" class="party-logo">
                    ${properties.PRU2022}
                    ${properties.Parti}
                </td>
            </tr>

            <tr>
                <th>Winner</th>
                <td>
                    ${properties.Pemenang}
                </td>
            </tr>

            <tr>
                <th>Majority Votes</th>
                <td>
                    ${properties.Majority}
                </td>
            </tr>

            <tr>
                <th>By-election 2024</th>
                <td>
                    ${properties.ExtraE2024}
                </td>
            </tr>

        </table>

    `;
}

function highlightFeature(e) {

    const layer = e.target;

    // Don't change if this polygon is already selected
    if (layer === selectedLayer) return;

    layer.setStyle({
        weight: 3,
        fillOpacity: 0.8
    });

    map.getContainer().style.cursor = "pointer";
}

function resetHighlight(e) {

    const layer = e.target;

    if (layer === selectedLayer) return;

    geojson.resetStyle(layer);

    map.getContainer().style.cursor = "";
}

function selectFeature(e) {

    const layer = e.target;

    // Restore previous selected polygon
    if (selectedLayer) {
        geojson.resetStyle(selectedLayer);
    }

    // Save current polygon
    selectedLayer = layer;

    // Highlight selected polygon
    layer.setStyle({
        fill: false,
        weight: 4,
        color: "#000",
    });

    // Update sidebar
    updateInfo(layer.feature.properties);

    map.fitBounds(layer.getBounds(),{

        padding:[30,30]

    });

}

function onEachFeature(feature, layer) {

    layer.on({

        mouseover: highlightFeature,

        mouseout: resetHighlight,

        click: selectFeature

    });

}

function resetSelection() {

    if (selectedLayer) {

        geojson.resetStyle(selectedLayer);

        selectedLayer = null;

    }

    updateInfo();

    map.fitBounds(geojson.getBounds(), {
        padding: [0, 0]
    });

}

function searchFeature() {

    const keyword = document.getElementById("searchBox")
        .value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
        
    const resultDiv = document.getElementById("searchResults");

    resultDiv.innerHTML = "";

    if (!keyword) return;

    features.forEach(layer => {

        const p = layer.feature.properties;

        const searchable = [
            p.NAMA_DUN,
            p.KOD_DUN,
            p.Winner2026,
            p.Pemenang,
            p.JOHOR_DU_2
        ]
        .filter(Boolean)
        .map(v => String(v).trim().toLowerCase())
        .join(" ")
        .replace(/[^a-z0-9]/g, "");
        

        if (searchable.includes(keyword)) {

            const item = document.createElement("div");

            item.className = "search-item";
            item.innerHTML = `
            <strong>${p.KOD_DUN} ${p.NAMA_DUN} (${p.JOHOR_DU_2})</strong><br>
            <hr>
            <small>${p.Winner2026} (2026)</small>
            <tr>
                <td colspan="2">&nbsp;|</td>
            </tr>
            <small>${p.Winner2022} (2022)</small>
            `;

            item.onclick = function () {

                selectLayer(layer);

                document.getElementById("searchBox").value = "";
                resultDiv.innerHTML = "";

            };

            resultDiv.appendChild(item);

        }

    });

}

function selectLayer(layer){

    if(selectedLayer){

        geojson.resetStyle(selectedLayer);

    }

    selectedLayer=layer;

    layer.setStyle({

        fill:false,

        weight:4,

        color:"#000"

    });

    updateInfo(layer.feature.properties);

    map.fitBounds(layer.getBounds(),{

        padding:[30,30]

    });

}

function changeElection(field){

    currentField = field;

    geojson.eachLayer(function(layer){

        layer.setStyle(style(layer.feature));

    });

}

// 4. Load the data
fetch("data/districts.geojson")
.then(response => response.json())
.then(data => {
    
    geojson = L.geoJSON(data, {

        style: style,
        onEachFeature: onEachFeature
    
    }).addTo(map);
    
    features = geojson.getLayers();
    const searchBox = document.getElementById("searchBox");

    searchBox.addEventListener("input", searchFeature);
    
    map.fitBounds(geojson.getBounds());

});

fetch("data/labels.geojson")
    .then(response => response.json())
    .then(data => {

        L.geoJSON(data, {

            pointToLayer: function(feature, latlng) {

                return L.marker(latlng, {

                    icon: L.divIcon({
                        className: "label",
                        html: feature.properties.Display
                    }),

                    interactive: false

                });

            }

        }).addTo(map);

    });

document.getElementById("resetBtn").addEventListener("click", resetSelection);

document.getElementById("btn2026").onclick = function(){

    changeElection(electionFields["2026"]);

};

document.getElementById("btn2022").onclick = function(){

    changeElection(electionFields["2022"]);

};

