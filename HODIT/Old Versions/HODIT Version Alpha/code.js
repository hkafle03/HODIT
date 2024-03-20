function initialize() // List of symptoms + Initialize Variables.
{
    Head = {symptoms: ["Fever","Headache","Dizziness","Chills"], id: "Head"};
    Neck = {symptoms: ["Sore Throat"], id: "Neck"};
    Thorax = {symptoms: ["Sneezing","Cough","Chest Pain","Loss Of Breath","Racing Heartbeat"], id: "Thorax"};
    Abdomen = {symptoms: ["Cramps","Hunger","Nausea",], id: "Abdomen"};
    Pelvis = {symptoms: ["Urinary Bleeding","Difficulty Peeing","Genital Pain"], id: "Pelvis"};
    Spine = {symptoms: ["Stiffness","Posture Problems","Height Loss"], id: "Spine"}
    Buttocks = {symptoms: ["Rectal Blood","Muscle Aches"], id: "Buttocks"}
}
function changeGender(button) // Changes genders and uses a different image map.
{
    var anatomyImg = document.getElementById("anatomy");
    if (button.innerHTML == "♂")
    {
        button.innerHTML = "♀";
        button.style.left = "47.5vw";
        button.style.backgroundColor = "rgb(155, 66, 160)";
        anatomyImg.style.left = "20.5vw";
        anatomyImg.style.top = "15vh";
        anatomyImg.src = "images/female.png";
        anatomyImg.useMap = "#femalebody";
        return;
    }
    if (button.innerHTML == "♀")
    {
        button.innerHTML = "♂";
        button.style.left = defaultStatus;
        button.style.backgroundColor = "rgb(48, 99, 117)";
        anatomyImg.style.visibility = 'none';
        anatomyImg.style.left = defaultStatus;
        anatomyImg.style.top = defaultStatus;
        anatomyImg.src = "images/male.png";
        anatomyImg.style.visibility = "show";
        anatomyImg.useMap = "#malebody";
        return;
    }
}
// Displays the help paragraph.
function showHelp(help)
{
    helpP = document.getElementById("help-drop");
    if (helpP.style.opacity == 1)
    {
        helpP.style.opacity = 0;
        help.style.fontSize = "4vh";
        help.style.left = defaultStatus;
        return;
    }
    else
    {
        helpP.style.opacity = 1;
        help.style.fontSize = "2.93vh";
        help.style.left = "32.75vw";
        return;
    }
}
// Onclick of image map -> New dropdown & Adds symptoms to container.
function displaySymptoms(part)
{
    var myNode = document.getElementById("container");
    var sContainer = document.getElementById("symptomsContainer");
    while (myNode.firstChild) {myNode.removeChild(myNode.lastChild);} // Remove all existing dropdowns.
    var selection = document.createElement("SELECT");
    myNode.appendChild(selection);
    for (i = -1; i<(part.symptoms.length); i++)
    {
        var option = document.createElement("OPTION");
        selection.appendChild(option);
        if(i!==-1)
            option.innerHTML = part.symptoms[i];
        else
            option.innerHTML = part.id;
    }
    window.addEventListener('click',function(e) //Detect when any clicking occurs, then move the dropdown.
    {if(e.target.tagName == "AREA"){myNode.style.top = e.y+"px";}}); // Positions the dropdown.
    selection.onchange = function()
    {
        selectedSymptom = selection.options[selection.selectedIndex].text;
        if(selectedSymptom !== part.id){sContainer.innerHTML = selectedSymptom;}
    };
}