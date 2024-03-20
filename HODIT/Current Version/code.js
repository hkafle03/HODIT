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
function detectOS() // Detect Operating System.
{
    alertMessage = document.getElementById("alert-message");
    closeButton = document.getElementById("closebtn");
    if(navigator.appVersion.indexOf("Mac")==-1) // Detects if computer / laptop is Macintosh.
    {
        alertMessage.parentElement.style.display = "block";
        closeButton.style.display = "block";
        alertMessage.innerHTML = "We have detected you are not using a computer or laptop that runs macOS. Please use a macOS operating system for best user experience."
        alertMessage.parentElement.style.backgroundColor = "#fcba03";
        closeButton.style.color = "black";
        alertMessage.style.color = "black";
        return;
    }
}
function login() // Login Function.
{
    userDatabase = JSON.parse(localStorage.getItem('database')) || []; // Get existing database of users and passwords.
    accountUsername = document.getElementById("username").value;
    accountPassword = document.getElementById("password").value; 
    alertMessage.parentElement.style.backgroundColor = defaultStatus;
    closeButton.style.color = defaultStatus;
    alertMessage.style.color = defaultStatus;
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
            localStorage.setItem('user',JSON.stringify(userDatabase[i])); 
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
    alertMessage.parentElement.style.backgroundColor = defaultStatus;
    closeButton.style.color = defaultStatus;
    alertMessage.style.color = defaultStatus;
    // Errors for each situation.
    if (accountName === "" || accountName == null) 
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
    currentUser = new User(accountName,accountUsername,accountPassword,accountEmail); // Create a new user with a class.
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
function initialize() // Initializes symptoms, diagnoses, image, and retrieves data.
{
    // Current User.
    currentUser = JSON.parse(localStorage.getItem('user'));
    userDatabase = JSON.parse(localStorage.getItem('database')); 
    currentIndex = localStorage.getItem('index');
    firstFilter = true;
    anatomyImg = document.getElementById("anatomy");
    anatomyImg.src = "images/male.png";
    // Male & Female Symptoms
    Head = {symptoms: ["Blurred Vision","Body Aches","Chills","Confusion","Dizziness","Dry Mouth","Eye Swelling","Face Swelling","Fainting","Fatigue","Fever","Headaches",
    "Irritability","Irritated Eyes","Itchy Nose","Lightheadedness","Light Sensitivity","Memory Loss","Mood Changes","Nosebleeds",
    "Numbness","Rashes","Runny Nose","Sleepiness","Sneezing","Snoring"]};
    Neck = {symptoms: ["Cough","Coughing Blood","Hoarseness","Itching","Rashes","Redness","Skin Pain","Sore Throat"]};
    Thorax = {symptoms: ["Chest Pain","Loss Of Breath","Racing Heartbeat","Rashes","Redness","Skin Pain","Sneezing","Spasm","Swelling"]};
    Shoulders = {symptoms: ["Body Aches","Decreased R.O.M.","Itching","Muscle Pain","Rashes","Redness","Stiffness","Skin Pain","Spasm","Swelling"]};
    Forearms = {symptoms: ["Decreased R.O.M.","Pain","Weakness","Muscle Pain","Rashes","Redness","Skin Pain","Swelling","Tenderness"]};
    Abdomen = {symptoms: ["Bloating","Hunger","Nausea","Stomach Cramps","Vomiting","Weight Loss"]};
    Pelvis = {symptoms: ["Difficulty Urinating","Genital Itching","Genital Pain","Swollen Glands","Urinary Bleeding"]};
    Shins = {symptoms: ["Muscle Pain","Soreness","Swelling"]};
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
    // Diagnoses List and diagnosis + symptoms list. 27 diagnoses total.
    possibleDiagnoses = [];
    listSymptoms = [];
    diagnosesList = 
    [
        {name: "Allergies", symptoms: ["Irritated Eyes","Itchy Nose","Sneezing","Runny Nose","Rashes","Stomach Cramps","Vomiting","Cough","Loss Of Breath","Face Swelling"], treatment: "If your allergies are severe, see a doctor to identify what you are allergic to. If they are merely annoying, you may take an over-the-counter medication prescribed by a pharmacist."},
        {name: "Alzheimer's/Dementia", symptoms: ["Memory Loss","Confusion","Mood Changes"], treatment: "Alzheimer’s is a very complex disease. Therefore, it is unlikely anything can completely cure it. You may be able to achieve results with inhibitors like Razadyne® (galantamine), Exelon® (rivastigmine), and Aricept® (donepezil)."},
        {name: "Arthiritis", symptoms: ["Muscle Pain","Stiffness","Swelling","Redness","Decreased R.O.M."], treatment: "You can treat arthritis depending on the type. Common medications include Painkillers, NSAIDs, or Counterirritants. You can also do various types of therapies to slow down the swelling inside your body and joints."},
        {name: "Blood Pressure", symptoms: ["Headaches","Loss Of Breath","Nosebleeds","Dizziness","Chest Pain","Confusion"], treatment: "Remember that blood pressure may be genetic, so this might not work for you. Make sure to lose weight, exercise, eat healthy, reduce salt intake, drink less, cut caffeine and quit smoking. If your stress levels are high, that may also be the issue."},
        {name: "Bug Bite", symptoms: ["Swelling","Redness","Rashes","Skin Pain","Itching"], treatment: "Please immediately move to a safe area to avoid more bites or stings. Then wash the area with soap and water if necessary. Apply pressure, and if the itching is intense, take an antihistamine such as Benadryl to reduce itching. Please do not scratch or itch, as it will do more harm than good."},
        {name: "Cancer", symptoms: ["Weight Loss","Fatigue","Fever","Urinary Bleeding","Rectal Bleeding","Hoarseness","Coughing Blood","Swollen Breasts"], treatment: "There are many types of cancer, and you should make sure to identify which type to continue treatment. There is no cure for cancer, and you must make sure you check with your doctor. You can partake in types of cancer treatments such as chemotherapy, radiation therapy, immunotherapy, or hormone therapy. "},
        {name: "Cardiovascular Disease", symptoms: ["Chest Pain","Loss Of Breath","Lightheadedness","Dizziness","Fainting","Racing Heartbeat"], treatment: "You can take various types of surgery such as coronary artery bypass or valve repair and even replacement surgery. You can do some lifestyle changes such as losing weight, exercising, following a good diet and quitting destructive habits such as smoking."},
        {name: "Cold & Flu", symptoms: ["Body Aches","Chills","Fatigue","Sneezing","Cough","Sore Throat","Headaches","Fever","Itchy Nose","Runny Nose"], treatment: "The best thing you can do is rest. If you rest often, then the fight against the virus will be easier. However, you can drink plenty of water, take some over-the-counter medication for congestion, and be sure to drink plenty of warm liquids."},
        {name: "Conjunctivitis", symptoms: ["Irritated Eyes","Light Sensitivity","Eye Swelling","Blurred Vision"], treatment: "Known as “pink eye”, conjunctivitis can be treated with eye drops. Your doctor may prescribe an antibiotic, usually in the form of eye drops or ointment for the bacteria."},
        {name: "Coronavirus", symptoms: ["Fever","Chills","Cough","Loss Of Breath","Fatigue","Headaches","Body Aches","Sore Throat","Runny Nose","Vomiting"], treatment: "It is essential that you remain alert and cautious, as this is an ongoing pandemic. Please stay home as much as possible to avoid spreading the virus. If necessary visit your doctor to make sure you have not contracted the common cold. Be sure to be well-hydrated, and take over-the-counter-medications such as acetaminophen."},
        {name: "Depression", symptoms: ["Irritability","Weight Loss","Mood Changes","Sleepiness","Hunger"], treatment: "It is important to know that depression has both physical and mental implications. You should talk to a therapist, or if it is not serious, take medications such as antidepressants, SSRIs, and Antipsychotic."},
        {name: "Diabetes", symptoms: ["Hunger","Fatigue","Blurred Vision","Nausea","Numbness","Confusion"], treatment: "Type II diabetes is genetic, so that will play a factor in your treatment. However, you can still lower blood sugar levels by consuming less sugary foods, exercising, weight reduction and dietary changes."},
        {name: "Fracture", symptoms: ["Swelling","Pain","Decreased R.O.M.","Difficulty Moving"], treatment: "There is nothing more you can do to speed up the process of healing. Make sure to wear splints, braces, or casts, and be sure to avoid using the affected area for a while."},
        {name: "Gastroenteritis", symptoms: ["Vomiting","Chills","Weight Loss","Stomach Cramps","Nausea"], treatment: "Gastroenteritis is caused by the norovirus. There are many more, but norovirus is the most common. Make sure to drink plenty of fluids, take antibiotics, and make sure you go to the hospital to check if there is an underlying condition. It is also likely this is caused by a parasite, if so take drugs designed to kill them from a pharmacy."},
        {name: "Golfer's Elbow", symptoms: ["Pain","Tenderness","Stiffness","Weakness","Swelling","Tenderness"], treatment: "This is not so severe, so do not worry too much.Make sure to rest, apply ice, take pain relievers if necessary, stretching and physical therapy."},
        {name: "Herpes", symptoms: ["Difficulty Urinating","Genital Pain","Genital Itching","Swollen Glands"], treatment: "You can take painkillers, bathe in salted water, take warm baths, apply petroleum jelly, wear loser clothing and refrain from sexual activity until all symptoms have disappeared."},
        {name: "Indigestion", symptoms: ["Nausea","Stomach Cramps","Bloating"], treatment: "Indigestion is also related to heartburn, but make sure that indigestion is definitely the cause for your discomfort. Avoid foods that trigger these responses such as alcohol, peppers, chocolate, citrus fruits, or tomatoes. Eat in smaller meals of fix to six instead of three or four."},
        {name: "HIV/AIDS", symptoms: ["Fever","Chills","Rashes","Sore Throat","Body Aches"], treatment: "There is no cure for HIV. It takes a gradual amount of time to become AIDS. One treatment for HIV is called antiretroviral therapy where you take a combination of HIV medicines every day. Although it will not cure HIV, it will help you live a longer, happier life."},
        {name: "Migraine", symptoms: ["Headache","Light Sensitivity","Nausea","Vomiting","Lightheadedness","Numbness"], treatment: "Firstly, see if you can take an MRI or CT scan so that you are sure that the migraine is not indicative of another underlying, more severe condition. If it is a simple migraine, you may take pain relievers, triptans, or opioid medications."},
        {name: "Osteoporosis", symptoms: ["Back Pain","Height Loss","Posture Problems","Soft Bones"], treatment: "You can take treatment such as bisphosphonates, monoclonal antibodies or hormone related therapy. Osteoporosis can be a result of low calcium intake, which means you should consume these foods, one great example of which is milk. You can also exercise, to strengthen both your bones and muscles."},
        {name: "Pneumonia", symptoms: ["Cough","Fever","Loss Of Breath","Chest Pain","Nausea","Vomiting","Fatigue"], treatment: "Firstly, do not take cough medicines unless approved by your doctor. If you have a fever, you can control it with aspirin, or anti-inflammatory drugs. Make sure to drink plenty of fluids to loosen phlegm and secretions."},
        {name: "Pregnancy", symptoms: ["Vaginal Bleeding","Vaginal Cramps","Swollen Breasts","Fatigue","Mood Changes"], treatment: "Pregnancy is not something to be treated as it is natural. If you are seeking to prevent pregnancy, be sure to use contraception or spermicide."},
        {name: "Shin Splints", symptoms: ["Soreness","Muscle Pain","Swelling"], treatment: "Keep your legs elevated, use ice packs, take over the counter anti-inflammatory medications such as ibuprofen or naproxen sodium. Also wear elastic compression bandages and form rollers."},
        {name: "Sleep Apnea", symptoms: ["Snoring","Dry Mouth","Irritability","Headache","Sleepiness"], treatment: "The most effective treatment for sleep apnea is to use a CPAP (continuous positive airway device). Some lifestyle changes you should do are losing weight, trying different sleep positions, and to avoid drinking and smoking."},
        {name: "Sprain", symptoms: ["Muscle Pain","Swelling","Difficulty Moving","Joint Popping","Bruising"], treatment: "Be sure to remember RICE. Rest, Ice, Compression, and Elevation. In general you should avoid using the affected area of the body until certified by a doctor."},
        {name: "Strain", symptoms: ["Spasm","Muscle Pain","Swelling","Decreased R.O.M."], treatment: "You should protect the strained muscle from further injury. Similar to a sprain, use RICE for effective treatment. Rest, Ice, Compression, and Elevation."},
        {name: "Tendinitis", symptoms: ["Muscle Pain","Swelling","Difficulty Moving","Lumping"], treatment: "Similar to sprains, strains and shin splints, use the RICE program. Rest, ice, compression, and elevation of the injured tendon. If necessary, use aspirin, ibuprofen, or other anti-inflammatory drugs to help with the pain."}
    ]  
}
function changeGender(button) // Changes genders and changes the image map.
{
    anatomyPos = document.getElementById("anatomyContainer");
    if (button.innerHTML == "♂") // Female.
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
    if (button.innerHTML == "♀") // Male.
    {
        button.innerHTML = "♂";
        button.style.left = defaultStatus;
        button.style.backgroundColor = "#226089";
        anatomyPos.style.left = defaultStatus;
        anatomyPos.style.top = defaultStatus;
        anatomyImg.src = "images/male.png";
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
function showInfo() // Show the account information by extracting from database.
{
    document.getElementById("account-info").style.display = "block";
    document.getElementById("website-blur").style.display = "block";
    document.getElementById("account-info-name").innerHTML = currentUser.accountName;
    document.getElementById("account-info-username").innerHTML = currentUser.accountUsername;
    document.getElementById("account-info-password").innerHTML = currentUser.accountPassword;
    document.getElementById("account-info-email").innerHTML = currentUser.accountEmail;
    document.getElementById("account-info-diagnoses").innerHTML = userDatabase[currentIndex].accountDiagnoses;
    if (document.getElementById("account-info-diagnoses").innerHTML == "")
    {document.getElementById("account-info-diagnoses").innerHTML = "Not Diagnosed.";}
}
function hideInfo() // Close the account information and remove background blur.
{
    document.getElementById("website-blur").style.display = "none";
    document.getElementById("account-info").style.display = "none";
} 
function displaySymptoms(part,refer) // Create the select element, and add the relevent symptoms based on body part.
{
    if (firstFilter == true)
    {
        selectedPart = refer.title;
        myNode = document.getElementById("container");
        sContainer = document.getElementById("symptomsLayer");
        while (myNode.firstChild) {myNode.removeChild(myNode.lastChild);} 
        selection = document.createElement("SELECT");
        myNode.appendChild(selection);
        part.symptoms.sort();
        for (i = -1; i<(part.symptoms.length); i++)
        {
            var option = document.createElement("OPTION");
            selection.appendChild(option);
            if(i!==-1)
                option.innerHTML = part.symptoms[i];
            else
                option.innerHTML = selectedPart;
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
document.addEventListener('input',function() // When an option is selected, add a new dropdown and add symptoms to table.
{
    selection.disabled = true;
    selectedSymptom = selection.options[selection.selectedIndex].text;
    listSymptoms.push(selectedSymptom);
    myNode.firstChild.disabled = true;
    sContainer.innerHTML+= selectedSymptom + "<br/>";
    selection = document.createElement("SELECT");
    myNode.appendChild(selection);
    selection.style.display = "block";
    selection.style.marginTop = "1vh";
    addSymptoms();
},false)
function addSymptoms() // Add symptoms to the select, using an algorithm.
{
    var uniqueValues = [];
    var tempArray = [];
    if (firstFilter == true) // Narrows down first set of symptoms.
    {
        for (i = 0; i< diagnosesList.length;i++)
        {
            if (diagnosesList[i].symptoms.includes(selectedSymptom)&&(!(anatomyImg.src.includes("images/male.png")&&(diagnosesList[i].name == "Pregnancy"))))
            {
                if ((diagnosesList[i].name == "Golfer's Elbow")||diagnosesList[i].name == "Shin Splints")
                {
                    if ((selectedPart == "Forearms")||selectedPart == "Shins")
                        possibleDiagnoses.push(diagnosesList[i]);
                }
                else
                    possibleDiagnoses.push(diagnosesList[i]); // possibleDiagnoses has all possible outcomes.
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
    for (i = 0;i<possibleDiagnoses.length;i++) // Identify duplicate Values
    {
        for (j=0;j<possibleDiagnoses[i].symptoms.length;j++)
        {
            if ((possibleDiagnoses[i].symptoms[j] !== selectedSymptom)&& !(uniqueValues.includes(possibleDiagnoses[i].symptoms[j])))
                uniqueValues.push(possibleDiagnoses[i].symptoms[j]);
        }
    }
    if (possibleDiagnoses.length !== 1) // Remove duplicate values and symptoms to populate options.
    {
        for (i = -1;i<uniqueValues.length;i++) 
        {
            if(!(listSymptoms.includes(uniqueValues[i])))
            {
                uniqueValues.sort();
                var option = document.createElement("OPTION");
                selection.appendChild(option);
                if (i == -1){option.innerHTML = "Select";}
                else{option.innerHTML = uniqueValues[i];}
            }
        }
    }
    else 
        showDiagnosis();
}
function showDiagnosis() // Extract the diagnosis and save diagnosis to the database.
{
    dContainer = document.getElementById("diagnosisContainer");
    document.getElementById("finishedDiagnosis").innerHTML = possibleDiagnoses[0].name;
    currentUser.accountDiagnoses.push(possibleDiagnoses[0].name);
    localStorage.setItem('user',JSON.stringify(currentUser));
    userDatabase[currentIndex].accountDiagnoses.push(possibleDiagnoses[0].name);
    localStorage.setItem('database',JSON.stringify(userDatabase)); // Save to database.
    dContainer.innerHTML += possibleDiagnoses[0].treatment;
    finishedDiagnosis.style.fontSize = "2.5vh";
    selection.style.display = "none";
}