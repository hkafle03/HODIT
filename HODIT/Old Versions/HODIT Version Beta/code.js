window.addEventListener('DOMContentLoaded', function() // Preloader when page is loading. Elements are hidden and ease-in smoothly.
{
    var overlay = document.getElementById("overlay");
    var logoWord = document.getElementById("logo");
    var accountButton = document.getElementById("account-button");
    var logoutButton = document.getElementById("logout");
    window.addEventListener('load', function()
    {
        overlay.style.opacity = 0;
        setTimeout(function(){overlay.style.display = "none"},1060);
        setTimeout(function(){logoWord.style.opacity = 1},400);
        setTimeout(function(){accountButton.style.opacity = 1},400);
        setTimeout(function(){logoutButton.style.opacity = 1},400);
    });
});
function login() // Login Function.
{
    userDatabase = JSON.parse(localStorage.getItem('database')) || []; // Get existing database of users and passwords.
    accountUsername = document.getElementById("username").value;
    accountPassword = document.getElementById("password").value; 
    alertMessage = document.getElementById("alert-message");
    closeButton = document.getElementById("closebtn");
    if (userDatabase.length == 0) // Since this is not a server databse, data is saved in localStorage. 
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "Please create an account. No accounts are currently saved."
        return;
    }
    for (i=0;i<userDatabase.length;i++) // Errors if information is invalid.
    {
        if(userDatabase[i].accountUsername == accountUsername)
        {
            if (userDatabase[i].accountPassword !== accountPassword)
            {
                alertMessage.parentElement.style.display = "block";
                closeButton.style.display = "block";
                alertMessage.innerHTML = "Password is invalid."
                return;
            }
            localStorage.setItem('index',i);
            localStorage.setItem('user',JSON.stringify(userDatabase[i])); // Set to current user.
            location.href = "home.html";
        }
        else if (i+1 == userDatabase.length)
        {
            alertMessage.parentElement.style.display = "block";
            closeButton.style.display = "block";
            alertMessage.innerHTML = "Username not found."
            return;
        }
    }   
}
function signup() // Signup Function.
{
    userDatabase = JSON.parse(localStorage.getItem('database')) || []; 
    accountName = document.getElementById("name").value;
    accountUsername = document.getElementById("username").value;
    accountPassword = document.getElementById("password").value;
    accountEmail = document.getElementById("email").value;
    alertMessage = document.getElementById("alert-message");
    closeButton = document.getElementById("closebtn");
    if (accountName === "" || accountName == null) // Errors if invalid text inputs.
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "Name is required."
        return;
    }
    if (accountUsername.length <= 4 || accountUsername.length >= 20)
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "Username must be between 5 and 19 characters.";
        return;
    }
    for (i=0;i<userDatabase.length;i++)
    {
        if (userDatabase[i].accountUsername == accountUsername)
        {
            alertMessage.parentElement.style.display = "block";
            closeButton.style.display = "block";
            alertMessage.innerHTML = "Username is already taken.";
            return;
        }
    }
    if (accountPassword.length <= 4 || accountPassword.length >= 20)
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "Password must be between 5 and 19 characters.";
        return;
    }
    if (!(accountEmail.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/))) // match(); algorithm that only accepts valid e-mails.
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "E-mail address must be valid.";
        return;
    }
    currentUser = new User(accountName,accountUsername,accountPassword,accountEmail);
    userDatabase.push(currentUser);    
    localStorage.setItem('database',JSON.stringify(userDatabase));
    localStorage.setItem('user',JSON.stringify(currentUser));
    currentIndex = userDatabase.indexOf(currentUser);
    localStorage.setItem('index',currentIndex)
    location.href = "home.html";
}
function User(name, username, password, email) // User class function. Create user with properties.
{
    this.accountName = name;
    this.accountUsername = username;
    this.accountPassword = password;
    this.accountEmail = email;
    this.accountDiagnoses = [];
}
function initialize() // Initializes symptoms and the diagnoses.
{
    // Male & Female Symptoms
    Head = {symptoms: ["Blurred Vision","Body Aches","Chills","Confusion","Dizziness","Dry Mouth","Face Swelling","Fainting","Fatigue","Fever","Headaches",
    "Irritability","Irritated Eyes","Itchy Nose","Lightheadedness","Light Sensitivity","Memory Loss","Mood Changes","Nosebleeds",
    "Numbness","Rashes","Runny Nose","Sneezing","Snoring"]};
    Neck = {symptoms: ["Cough","Coughing Blood","Hoarseness","Itching","Rashes","Redness","Skin Pain","Sore Throat"]};
    Thorax = {symptoms: ["Chest Pain","Loss Of Breath","Racing Heartbeat","Rashes","Redness","Skin Pain","Sneezing","Spasm","Swelling"]};
    Shoulders = {symptoms: ["Body Aches","Decreased R.O.M.","Itching","Muscle Pain","Rashes","Redness","Stiffness","Skin Pain","Spasm","Swelling"]};
    Forearms = {symptoms: ["Decreased R.O.M.","Forearm Pain","Forearm Weakness","Muscle Pain","Rashes","Redness","Skin Pain","Forearm Swelling","Forearm Tenderness"]};
    Abdomen = {symptoms: ["Hunger","Nausea","Stomach Cramps","Vomiting","Weight Loss"]};
    Pelvis = {symptoms: ["Difficulty Urinating","Genital Itching","Genital Pain","Swollen Glands","Urinary Bleeding"]};
    Shins = {symptoms: ["Muscle Pain","Soreness","Shin Swelling"]};
    Spine = {symptoms: ["Height Loss","Posture Problems","Soft Bones","Stiffness"]};
    LowerBack = {symptoms: ["Back Pain","Body Aches","Muscle Pain"]};
    Buttocks = {symptoms: ["Body Aches","Rashes","Rectal Bleeding","Spasm"]};
    Achilles = {symptoms: ["Difficulty Walking","Muscle Pain","Swelling"]};
    muscleType = {symptoms: ["Decreased R.O.M.","Difficulty Moving","Itching","Lumping","Muscle Pain","Numbness","Rashes","Redness","Skin Pain","Spasm","Swelling"]};
    jointType = {symptoms:["Difficulty Moving","Joint Popping","Stiffness","Swelling"]};
    appendageType = {symptoms: ["Numbness","Rashes","Redness","Soft Bones","Stiffness","Swelling"]};
    // Female Symptoms (Pregnancy)
    ThoraxF = {symptoms: ["Chest Pain","Loss Of Breath","Racing Heartbeat","Rashes","Redness","Sneezing","Skin Pain","Spasm","Swollen Breasts"]};
    PelvisF = {symptoms: ["Difficulty Urinating","Genital Itching","Genital Pain","Swollen Glands","Urinary Bleeding","Vaginal Bleeding"]};
    // Diagnoses List + possibleDiagnoses.
    possibleDiagnoses = [];
    diagnosesList = 
    [
        {name: "Allergies", symptoms: ["Irritated Eyes","Itchy Nose","Sneezing","Runny Nose","Rashes","Stomach Cramps","Vomiting","Cough","Loss Of Breath","Face Swelling"], treatment: "If your allergies are severe, see a doctor to identify what you are allergic to. If they are merely annoying, you may take an over-the-counter medication prescribed by a pharmacist."},
        {name: "Alzheimer's/Dementia", symptoms: ["Memory Loss","Confusion","Mood Changes"], treatment: "Alzheimer’s is a very complex disease. Therefore, it is unlikely anything can completely cure it. You may be able to achieve results with inhibitors like Razadyne® (galantamine), Exelon® (rivastigmine), and Aricept® (donepezil)."},
        {name: "Arthiritis", symptoms: ["Muscle Pain","Stiffness","Swelling","Redness","Decreased R.O.M."], treatment: "You can treat arthritis depending on the type. Common medications include Painkillers, NSAIDs, Counterirritants, or Counterirritants."},
        {name: "Blood Pressure", symptoms: ["Headaches","Loss Of Breath","Nosebleeds","Dizziness","Chest Pain"], treatment: "Remember that blood pressure may be genetic, so this might not work for you. Make sure to lose weight, exercise, eat healthy, reduce salt intake, drink less, cut caffeine and quit smoking. If your stress levels are high, that may also be the issue."},
        {name: "Bug Bite", symptoms: ["Swelling","Redness","Rashes","Skin Pain","Itching"], treatment: "Please immediately move to a safe area to avoid more bites or stings. Then wash the area with soap and water if necessary. Apply pressure, and if the itching is intense, take an antihistamine such as Benadryl to reduce itching. Please do not scratch or itch, as it will do more harm than good."},
        {name: "Cancer", symptoms: ["Weight Loss","Fatigue","Fever","Urinary Bleeding","Rectal Bleeding","Hoarseness","Coughing Blood","Swollen Breasts"], treatment: "There is no cure for cancer, and you must make sure you check with your doctor. You can partake in types of cancer treatments such as chemotherapy, radiation therapy, immunotherapy, or hormone therapy. "},
        {name: "Cardiovascular Disease", symptoms: ["Chest Pain","Loss Of Breath","Lightheadedness","Dizziness","Fainting","Racing Heartbeat"], treatment: "You can take various types of surgery such as coronary artery bypass or valve repair and even replacement surgery. You can do some lifestyle changes such as losing weight, exercising, following a good diet and quitting destructive habits such as smoking."},
        {name: "Cold & Flu", symptoms: ["Body Aches","Chills","Fatigue","Sneezing","Cough","Sore Throat","Headaches","Fever"], treatment: "The best thing you can do is rest. If you rest often, then the fight against the virus will be easier. However, you can drink plenty of water, take some over-the-counter medication for congestion, and be sure to drink plenty of warm liquids."},
        {name: "Diabetes", symptoms: ["Hunger","Fatigue","Blurred Vision","Nausea","Numbness"], treatment: "Type II diabetes is genetic, so that will play a factor in your treatment. However, you can still lower blood sugar levels by consuming less sugary foods, exercising, weight reduction and dietary changes."},
        {name: "Fracture", symptoms: ["Swelling","Pain","Decreased R.O.M.","Difficulty Moving"], treatment: "There is nothing more you can do to speed up the process of healing. Make sure to wear splints, braces, or casts, and be sure to avoid using the affected area for a while."},
        {name: "Golfer's Elbow", symptoms: ["Forearm Pain","Tenderness","Stiffness","Forearm Weakness"], treatment: "This is not so severe, so do not worry too much.Make sure to rest, apply ice, take pain relievers if necessary, stretching and physical therapy."},
        {name: "Herpes", symptoms: ["Difficulty Urinating","Genital Pain","Genital Itching","Swollen Glands"], treatment: "You can take painkillers, bathe in salted water, take warm baths, apply petroleum jelly, wear loser clothing and refrain from sexual activity until all symptoms have disappeared."},
        {name: "HIV/AIDS", symptoms: ["Fever","Chills","Rashes","Sore Throat","Body Aches"], treatment: "There is no cure for HIV. It takes a gradual amount of time to become AIDS. One treatment for HIV is called antiretroviral therapy where you take a combination of HIV medicines every day. Although it will not cure HIV, it will help you live a longer, happier life."},
        {name: "Migraine", symptoms: ["Headache","Light Sensitivity","Nausea","Vomiting"], treatment: "Firstly, see if you can take an MRI or CT scan so that you are sure that the migraine is not indicative of another underlying, more severe condition. If it is a simple migraine, you may take pain relievers, triptans, or opioid medications."},
        {name: "Osteoporosis", symptoms: ["Back Pain","Height Loss","Posture Problems","Soft Bones"], treatment: "You can take treatment such as bisphosphonates, monoclonal antibodies or hormone related therapy. Osteoporosis can be a result of low calcium intake, which means you should consume these foods, one great example of which is milk. You can also exercise, to strengthen both your bones and muscles."},
        {name: "Pneumonia", symptoms: ["Cough","Fever","Loss Of Breath","Chest Pain","Nausea","Vomiting","Fatigue"], treatment: "Firstly, do not take cough medicines unless approved by your doctor. If you have a fever, you can control it with aspirin, or anti-inflammatory drugs. Make sure to drink plenty of fluids to loosen phlegm and secretions."},
        {name: "Pregnancy", symptoms: ["Vaginal Bleeding","Vaginal Cramps","Swollen Breasts","Fatigue","Mood Changes"], treatment: "Pregnancy is not something to be treated as it is natural. If you are seeking to prevent pregnancy, be sure to use contraception or spermicide."},
        {name: "Shin Splints", symptoms: ["Soreness","Muscle Pain","Shin Swelling"], treatment: "Keep your legs elevated, use ice packs, take over the counter anti-inflammatory medications such as ibuprofen or naproxen sodium. Also wear elastic compression bandages and form rollers."},
        {name: "Sleep Apnea", symptoms: ["Snoring","Dry Mouth","Irritability","Headache"], treatment: "The most effective treatment for sleep apnea is to use a CPAP (continuous positive airway device). Some lifestyle changes you should do are losing weight, trying different sleep positions, and to avoid drinking and smoking."},
        {name: "Sprain", symptoms: ["Muscle Pain","Swelling","Difficulty Moving","Joint Popping","Bruising"], treatment: "Be sure to remember RICE. Rest, Ice, Compression, and Elevation. In general you should avoid using the affected area of the body until certified by a doctor."},
        {name: "Strain", symptoms: ["Spasm","Muscle Pain","Swelling","Decreased R.O.M."], treatment: "You should protect the strained muscle from further injury. Similar to a sprain, use RICE for effective treatment. Rest, Ice, Compression, and Elevation."},
        {name: "Tendinitis", symptoms: ["Muscle Pain","Swelling","Difficulty Moving","Lumping"], treatment: "Similar to sprains, strains and shin splints, use the RICE program. Rest, ice, compression, and elevation of the injured tendon. If necessary, use aspirin, ibuprofen, or other anti-inflammatory drugs to help with the pain."},
    ]  
    firstFilter = true;
    anatomyImg = document.getElementById("anatomy");
    currentUser = JSON.parse(localStorage.getItem('user')); // Current User.
    userDatabase = JSON.parse(localStorage.getItem('database')); 
    currentIndex = localStorage.getItem('index');
}
function changeGender(button) // Changes genders and uses a different image map.
{
    anatomyPos = document.getElementById("anatomyContainer");
    if (button.innerHTML == "♂")
    {
        button.innerHTML = "♀";
        button.style.left = "47.5vw";
        button.style.backgroundColor = "#eb89b5";
        anatomyPos.style.left = "21vw";
        anatomyPos.style.top = "16.5vh";
        anatomyImg.src = "images/female.png";
        anatomyImg.useMap = "#femalebody";
        return;
    }
    if (button.innerHTML == "♀")
    {
        button.innerHTML = "♂";
        button.style.left = defaultStatus;
        button.style.backgroundColor = "#226089";
        anatomyImg.style.visibility = 'none';
        anatomyPos.style.left = defaultStatus;
        anatomyPos.style.top = defaultStatus;
        anatomyImg.src = "images/male.png";
        anatomyImg.style.visibility = "show";
        anatomyImg.useMap = "#malebody";
        return;
    }
}
function showHelp(help) // Displays the help paragraph.
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
function showInfo() // Show the account information
{
    document.getElementById("account-info").style.display = "block";
    document.getElementById("website-blur").style.display = "block";
    document.getElementById("account-info-name").innerHTML = currentUser.accountName;
    document.getElementById("account-info-username").innerHTML = currentUser.accountUsername;
    document.getElementById("account-info-password").innerHTML = currentUser.accountPassword;
    document.getElementById("account-info-email").innerHTML = currentUser.accountEmail;
    document.getElementById("account-info-diagnoses").innerHTML = userDatabase[currentIndex].accountDiagnoses;
}
function hideInfo() // Remove the blur.
{
    document.getElementById("website-blur").style.display = "none";
    document.getElementById("account-info").style.display = "none";
} 
function displaySymptoms(part,refer) // Create the select element, and add the relevent symptoms based on body part.
{
    if (firstFilter == true)
    {
        myNode = document.getElementById("container");
        sContainer = document.getElementById("symptomsContainer");
        while (myNode.firstChild) {myNode.removeChild(myNode.lastChild);} 
        selection = document.createElement("SELECT");
        myNode.appendChild(selection);
        for (i = -1; i<(part.symptoms.length); i++)
        {
            var option = document.createElement("OPTION");
            selection.appendChild(option);
            if(i!==-1)
                option.innerHTML = part.symptoms[i];
            else
                option.innerHTML = refer.title;
        }
        // The reset button is visible.
        selection.onchange = function()
        {
            resetButton = document.getElementById("reset");
            resetButton.style.display = "block";
            document.getElementById("gender").disabled = true;
        };
    }
}

window.addEventListener('click',function(e) // When a body part is selected, move select box next to image, to make it easier for the user.
{if(e.target.tagName == "AREA" && firstFilter == true)
    {
        myNode.style.top = (((e.y)/(window.innerHeight))*100)+"vh";
        if(event.clientX > (window.innerWidth*(1/3))){myNode.style.left = "57vw";}
        else{myNode.style.left = "4vw";}
    }
}); 

document.addEventListener('input',function() // When an option is selected, add a new dropdown and add symptom to table.
{
    selection.disabled = true;
    selectedSymptom = selection.options[selection.selectedIndex].text;
    myNode.firstChild.disabled = true;
    sContainer.innerHTML+= selectedSymptom + "<br/>";
    selection = document.createElement("SELECT");
    myNode.appendChild(selection);
    selection.style.display = "block";
    selection.style.marginTop = "1vh";
    addSymptoms();
},false)

function clearContainer() // Reset button functionality.
{
    window.location.reload();
}

function addSymptoms() // Narrow down the symptoms to a group of diagnoses.
{
    var uniqueValues = [];
    var tempArray = [];
    if (firstFilter == true) // Narrows down first set of symptoms.
    {
        for (i = 0; i< diagnosesList.length;i++)
        {
            if (diagnosesList[i].symptoms.includes(selectedSymptom))
            {
                possibleDiagnoses.push(diagnosesList[i]);  
            }
        }
    }
    if (firstFilter == false) // Narrows down further set of symptoms.
    {
        for (i = 0;i < possibleDiagnoses.length;i++)
        {
            if (possibleDiagnoses[i].symptoms.includes(selectedSymptom))
                tempArray.push(possibleDiagnoses[i]);  
        }
        possibleDiagnoses = tempArray;
    }
    firstFilter = false;
    for (i = 0;i<possibleDiagnoses.length;i++) // Identify Duplicate Values
    {
        for (j=0;j<possibleDiagnoses[i].symptoms.length;j++)
        {
            if ((possibleDiagnoses[i].symptoms[j] !== selectedSymptom)&& !(uniqueValues.includes(possibleDiagnoses[i].symptoms[j])))
            {
                uniqueValues.push(possibleDiagnoses[i].symptoms[j]);
            }
        }
    }
    if (possibleDiagnoses.length !== 1) // Remove Duplicate Values and populate options.
    {
        for (i = -1;i<uniqueValues.length;i++) 
        {
            var option = document.createElement("OPTION");
            selection.appendChild(option);
            if (i == -1){option.innerHTML = "Select";}
            else{option.innerHTML = uniqueValues[i];}
        }
    }
    else // Show the diagnosis
    {
        dContainer = document.getElementById("diagnosisContainer");
        document.getElementById("finishedDiagnosis").innerHTML = possibleDiagnoses[0].name;
        currentUser.accountDiagnoses.push(possibleDiagnoses[0].name);
        localStorage.setItem('user',JSON.stringify(currentUser));
        userDatabase[currentIndex].accountDiagnoses.push(possibleDiagnoses[0].name);
        localStorage.setItem('database',JSON.stringify(userDatabase));
        dContainer.innerHTML += possibleDiagnoses[0].treatment;
        finishedDiagnosis.style.fontSize = "2.5vh";
        selection.style.display = "none";
    }
}