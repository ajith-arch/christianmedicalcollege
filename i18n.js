/* ─── CMC Vellore — Indian language support (portfolio demo) ─── */
(function () {
  const STORAGE_KEY = "cmc-lang";

  const LANG_META = {
    en: { label: "English", short: "EN", native: "English" },
    hi: { label: "Hindi", short: "HI", native: "हिन्दी" },
    ta: { label: "Tamil", short: "TA", native: "தமிழ்" },
    te: { label: "Telugu", short: "TE", native: "తెలుగు" },
    ml: { label: "Malayalam", short: "ML", native: "മലയാളം" },
    kn: { label: "Kannada", short: "KN", native: "ಕನ್ನಡ" },
    bn: { label: "Bengali", short: "BN", native: "বাংলা" },
    mr: { label: "Marathi", short: "MR", native: "मराठी" },
  };

  const T = {
    en: {
      "lang.label": "Choose language",
      "nav.patientCare": "Patient Care",
      "nav.education": "Education",
      "nav.research": "Research",
      "nav.departments": "Departments",
      "nav.about": "About",
      "nav.medicalServices": "Medical Services",
      "nav.findDoctor": "Find a Doctor",
      "nav.faq": "FAQs",
      "btn.bookAppointment": "Book Appointment",
      "btn.emergency": "Emergency",
      "fd.home": "Home",
      "fd.title": "Find a Doctor",
      "fd.subtitle": "Search by doctor name, specialty, symptoms, condition, department, or service.",
      "fd.askQuestion": "Ask a question",
      "fd.searchDoctors": "Search Doctors",
      "fd.searchAria": "Search doctors, specialties, symptoms",
      "fd.emergencyAlert": 'If this is a serious emergency, please <a href="index.html#emergency">contact emergency care immediately</a>.',
      "fd.continueProfile": "Continue with Patient Profile",
      "fd.profileDesc": "Sign in to see personalized doctor recommendations based on your visit history.",
      "fd.demoLogin": "Demo Login",
      "fd.guest": "Continue as Guest",
      "fd.dashboardEyebrow": "Patient Dashboard",
      "fd.welcome": "Welcome back, Arun",
      "fd.logout": "Log out",
      "fd.prevConsultant": "Previous Consultant",
      "fd.recentConcern": "Recent Concern",
      "fd.lastVisit": "Last Visit",
      "fd.upcoming": "Upcoming Suggestion",
      "fd.chestDiscomfort": "Chest discomfort",
      "fd.loggedSymptom": "Logged symptom",
      "fd.outPatient": "Out-patient",
      "fd.followUpSuggest": "Follow-up consultation recommended",
      "fd.tabRecommended": "Recommended Doctors",
      "fd.tabPrevious": "Previous Doctors",
      "fd.tabHistory": "Consultation History",
      "fd.tabSaved": "Saved Departments",
      "fd.insightsEyebrow": "Health Insights",
      "fd.insightsTitle": "Commonly searched in your region",
      "fd.insightsHelper": "Based on common searches and seasonal healthcare needs in the region.",
      "fd.specialityEyebrow": "Browse by Speciality",
      "fd.specialityTitle": "Frequently searched specialities",
      "fd.doctorsEyebrow": "Doctors",
      "fd.doctorsTitle": "Available Specialists",
      "fd.doctorsCount": "4 doctors",
      "fd.noResults": "No doctors match your search. Try a specialty, symptom, or condition.",
      "fd.bookInClinic": "Book In-Clinic Appointment",
      "fd.bookVideo": "Book Video Consultation",
      "fd.yearsExp": "years experience",
      "fd.expertise": "Expertise:",
      "fd.toastGuest": "Continuing as guest — personalized features are hidden in demo.",
      "fd.searchPrefix": "Search",
    },
    hi: {
      "lang.label": "भाषा चुनें",
      "nav.patientCare": "रोगी देखभाल",
      "nav.education": "शिक्षा",
      "nav.research": "अनुसंधान",
      "nav.departments": "विभाग",
      "nav.about": "हमारे बारे में",
      "nav.medicalServices": "चिकित्सा सेवाएँ",
      "nav.findDoctor": "डॉक्टर खोजें",
      "nav.faq": "सामान्य प्रश्न",
      "btn.bookAppointment": "अपॉइंटमेंट बुक करें",
      "btn.emergency": "आपातकाल",
      "fd.home": "होम",
      "fd.title": "डॉक्टर खोजें",
      "fd.subtitle": "डॉक्टर के नाम, विशेषता, लक्षण, स्थिति, विभाग या सेवा से खोजें।",
      "fd.askQuestion": "प्रश्न पूछें",
      "fd.searchDoctors": "डॉक्टर खोजें",
      "fd.searchAria": "डॉक्टर, विशेषता, लक्षण खोजें",
      "fd.emergencyAlert": 'यदि यह गंभीर आपातकाल है, तो कृपया <a href="index.html#emergency">तुरंत आपातकालीन देखभाल से संपर्क करें</a>।',
      "fd.continueProfile": "रोगी प्रोफ़ाइल के साथ जारी रखें",
      "fd.profileDesc": "अपने दौरे के इतिहास के आधार पर व्यक्तिगत डॉक्टर सिफारिशें देखने के लिए साइन इन करें।",
      "fd.demoLogin": "डेमो लॉगिन",
      "fd.guest": "अतिथि के रूप में जारी रखें",
      "fd.dashboardEyebrow": "रोगी डैशबोर्ड",
      "fd.welcome": "वापसी पर स्वागत है, अरुण",
      "fd.logout": "लॉग आउट",
      "fd.prevConsultant": "पिछले सलाहकार",
      "fd.recentConcern": "हाल की समस्या",
      "fd.lastVisit": "अंतिम दौरा",
      "fd.upcoming": "आगामी सुझाव",
      "fd.chestDiscomfort": "छाती में discomfort",
      "fd.loggedSymptom": "दर्ज लक्षण",
      "fd.outPatient": "बाह्य रोगी",
      "fd.followUpSuggest": "फॉलो-अप परामर्श की सिफारिश",
      "fd.tabRecommended": "अनुशंसित डॉक्टर",
      "fd.tabPrevious": "पिछले डॉक्टर",
      "fd.tabHistory": "परामर्श इतिहास",
      "fd.tabSaved": "सहेजे गए विभाग",
      "fd.insightsEyebrow": "स्वास्थ्य अंतर्दृष्टि",
      "fd.insightsTitle": "आपके क्षेत्र में अक्सर खोजे जाने वाले",
      "fd.insightsHelper": "क्षेत्र में सामान्य खोजों और मौसमी स्वास्थ्य आवश्यकताओं पर आधारित।",
      "fd.specialityEyebrow": "विशेषता से ब्राउज़ करें",
      "fd.specialityTitle": "अक्सर खोजी जाने वाली विशेषताएँ",
      "fd.doctorsEyebrow": "डॉक्टर",
      "fd.doctorsTitle": "उपलब्ध विशेषज्ञ",
      "fd.doctorsCount": "4 डॉक्टर",
      "fd.noResults": "कोई डॉक्टर आपकी खोज से मेल नहीं खाता। विशेषता या लक्षण आज़माएँ।",
      "fd.bookInClinic": "क्लिनिक में अपॉइंटमेंट बुक करें",
      "fd.bookVideo": "वीडियो परामर्श बुक करें",
      "fd.yearsExp": "वर्षों का अनुभव",
      "fd.expertise": "विशेषज्ञता:",
      "fd.toastGuest": "अतिथि के रूप में जारी — डेमो में व्यक्तिगत सुविधाएँ छिपी हैं।",
      "fd.searchPrefix": "खोजें",
    },
    ta: {
      "lang.label": "மொழியைத் தேர்ந்தெடுக்கவும்",
      "nav.patientCare": "நோயாளி பராமரிப்பு",
      "nav.education": "கல்வி",
      "nav.research": "ஆராய்ச்சி",
      "nav.departments": "துறைகள்",
      "nav.about": "எங்களைப் பற்றி",
      "nav.medicalServices": "மருத்துவ சேவைகள்",
      "nav.findDoctor": "மருத்துவரைக் கண்டறியுங்கள்",
      "nav.faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      "btn.bookAppointment": "சந்திப்பு பதிவு",
      "btn.emergency": "அவசரம்",
      "fd.home": "முகப்பு",
      "fd.title": "மருத்துவரைக் கண்டறியுங்கள்",
      "fd.subtitle": "மருத்துவர் பெயர், சிறப்பு, அறிகுறிகள், நிலை, துறை அல்லது சேவை மூலம் தேடுங்கள்.",
      "fd.askQuestion": "கேள்வி கேளுங்கள்",
      "fd.searchDoctors": "மருத்துவர்களைத் தேடுங்கள்",
      "fd.searchAria": "மருத்துவர், சிறப்பு, அறிகுறிகள் தேடுங்கள்",
      "fd.emergencyAlert": 'இது தீவிர அவசரநிலையானால், <a href="index.html#emergency">உடனடியாக அவசர சிகிச்சையைத் தொடர்பு கொள்ளுங்கள்</a>.',
      "fd.continueProfile": "நோயாளி சுயவிவரத்துடன் தொடரவும்",
      "fd.profileDesc": "உங்கள் வருகை வரலாற்றின் அடிப்படையில் தனிப்பயன் மருத்துவர் பரிந்துரைகளைப் பார்க்க உள்நுழையுங்கள்.",
      "fd.demoLogin": "டெமோ உள்நுழைவு",
      "fd.guest": "விருந்தினராக தொடரவும்",
      "fd.dashboardEyebrow": "நோயாளி டாஷ்போர்டு",
      "fd.welcome": "மீண்டும் வரவேற்கிறோம், அருண்",
      "fd.logout": "வெளியேறு",
      "fd.prevConsultant": "முந்தைய ஆலோசகர்",
      "fd.recentConcern": "சமீபத்திய கவலை",
      "fd.lastVisit": "கடைசி வருகை",
      "fd.upcoming": "வரவிருக்கும் பரிந்துரை",
      "fd.chestDiscomfort": "மார்பு அசௌகரியம்",
      "fd.loggedSymptom": "பதிவு செய்யப்பட்ட அறிகுறி",
      "fd.outPatient": "வெளிநோயாளி",
      "fd.followUpSuggest": "பின்தொடர் ஆலோசனை பரிந்துரைக்கப்படுகிறது",
      "fd.tabRecommended": "பரிந்துரைக்கப்பட்ட மருத்துவர்கள்",
      "fd.tabPrevious": "முந்தைய மருத்துவர்கள்",
      "fd.tabHistory": "ஆலோசனை வரலாறு",
      "fd.tabSaved": "சேமிக்கப்பட்ட துறைகள்",
      "fd.insightsEyebrow": "சுகாதார நுண்ணறிவு",
      "fd.insightsTitle": "உங்கள் பிராந்தியத்தில் அடிக்கடி தேடப்படுவது",
      "fd.insightsHelper": "பிராந்தியத்தில் பொதுவான தேடல்கள் மற்றும் பருவகால சுகாதார தேவைகளின் அடிப்படையில்.",
      "fd.specialityEyebrow": "சிறப்பு மூலம் உலாவுங்கள்",
      "fd.specialityTitle": "அடிக்கடி தேடப்படும் சிறப்புகள்",
      "fd.doctorsEyebrow": "மருத்துவர்கள்",
      "fd.doctorsTitle": "கிடைக்கும் நிபுணர்கள்",
      "fd.doctorsCount": "4 மருத்துவர்கள்",
      "fd.noResults": "உங்கள் தேடலுடன் பொருந்தும் மருத்துவர் இல்லை. வேறு சிறப்பு அல்லது அறிகுறியை முயற்சிக்கவும்.",
      "fd.bookInClinic": "மருத்துவமனையில் சந்திப்பு பதிவு",
      "fd.bookVideo": "வீடியோ ஆலோசனை பதிவு",
      "fd.yearsExp": "ஆண்டுகள் அனுபவம்",
      "fd.expertise": "நிபுணத்துவம்:",
      "fd.toastGuest": "விருந்தினராக தொடர்கிறீர்கள் — டெமோவில் தனிப்பயன் அம்சங்கள் மறைக்கப்பட்டுள்ளன.",
      "fd.searchPrefix": "தேடுங்கள்",
    },
    te: {
      "lang.label": "భాష ఎంచుకోండి",
      "nav.patientCare": "రోగి సంరక్షణ",
      "nav.education": "విద్య",
      "nav.research": "పరిశోధన",
      "nav.departments": "విభాగాలు",
      "nav.about": "మా గురించి",
      "nav.medicalServices": "వైద్య సేవలు",
      "nav.findDoctor": "డాక్టర్‌ను కనుగొనండి",
      "nav.faq": "తరచుగా అడిగే ప్రశ్నలు",
      "btn.bookAppointment": "అపాయింట్‌మెంట్ బుక్ చేయండి",
      "btn.emergency": "అత్యవసరం",
      "fd.home": "హోమ్",
      "fd.title": "డాక్టర్‌ను కనుగొనండి",
      "fd.subtitle": "డాక్టర్ పేరు, ప్రత్యేకత, లక్షణాలు, పరిస్థితి, విభాగం లేదా సేవ ద్వారా వెతకండి.",
      "fd.askQuestion": "ప్రశ్న అడగండి",
      "fd.searchDoctors": "డాక్టర్లను వెతకండి",
      "fd.searchAria": "డాక్టర్లు, ప్రత్యేకతలు, లక్షణాలు వెతకండి",
      "fd.emergencyAlert": 'ఇది తీవ్రమైన అత్యవసరమైతే, <a href="index.html#emergency">వెంటనే అత్యవసర సంరక్షణను సంప్రదించండి</a>.',
      "fd.continueProfile": "రోగి ప్రొఫైల్‌తో కొనసాగించండి",
      "fd.profileDesc": "మీ సందర్శన చరిత్ర ఆధారంగా వ్యక్తిగతీకరించిన డాక్టర్ సిఫార్సులు చూడండి.",
      "fd.demoLogin": "డెమో లాగిన్",
      "fd.guest": "అతిథిగా కొనసాగించండి",
      "fd.dashboardEyebrow": "రోగి డాష్‌బోర్డ్",
      "fd.welcome": "తిరిగి స్వాగతం, అరుణ్",
      "fd.logout": "లాగ్ అవుట్",
      "fd.prevConsultant": "మునుపటి కన్సల్టెంట్",
      "fd.recentConcern": "ఇటీవలి ఆందోళన",
      "fd.lastVisit": "చివరి సందర్శన",
      "fd.upcoming": "రాబోయే సూచన",
      "fd.chestDiscomfort": "ఛాతీ అసౌకర్యం",
      "fd.loggedSymptom": "నమోదు చేసిన లక్షణం",
      "fd.outPatient": "అవుట్-పేషెంట్",
      "fd.followUpSuggest": "ఫాలో-అప్ కన్సల్టేషన్ సిఫార్సు",
      "fd.tabRecommended": "సిఫార్సు చేసిన డాక్టర్లు",
      "fd.tabPrevious": "మునుపటి డాక్టర్లు",
      "fd.tabHistory": "కన్సల్టేషన్ చరిత్ర",
      "fd.tabSaved": "సేవ్ చేసిన విభాగాలు",
      "fd.insightsEyebrow": "ఆరోగ్య అంతర్దృష్టులు",
      "fd.insightsTitle": "మీ ప్రాంతంలో తరచుగా వెతకబడేవి",
      "fd.insightsHelper": "ప్రాంతీయ సాధారణ శోధనలు మరియు ఋతుపర ఆరోగ్య అవసరాల ఆధారంగా.",
      "fd.specialityEyebrow": "ప్రత్యేకత ద్వారా బ్రౌజ్ చేయండి",
      "fd.specialityTitle": "తరచుగా వెతకబడే ప్రత్యేకతలు",
      "fd.doctorsEyebrow": "డాక్టర్లు",
      "fd.doctorsTitle": "అందుబాటులో ఉన్న నిపుణులు",
      "fd.doctorsCount": "4 డాక్టర్లు",
      "fd.noResults": "మీ శోధనకు సరిపోయే డాక్టర్లు లేరు. వేరే ప్రత్యేకత ప్రయత్నించండి.",
      "fd.bookInClinic": "క్లినిక్‌లో అపాయింట్‌మెంట్ బుక్ చేయండి",
      "fd.bookVideo": "వీడియో కన్సల్టేషన్ బుక్ చేయండి",
      "fd.yearsExp": "సంవత్సరాల అనుభవం",
      "fd.expertise": "నైపుణ్యం:",
      "fd.toastGuest": "అతిథిగా కొనసాగుతున్నారు — డెమోలో వ్యక్తిగతీకరణ దాచబడింది.",
      "fd.searchPrefix": "వెతకండి",
    },
    ml: {
      "lang.label": "ഭാഷ തിരഞ്ഞെടുക്കുക",
      "nav.patientCare": "രോഗി പരിചരണം",
      "nav.education": "വിദ്യാഭ്യാസം",
      "nav.research": "ഗവേഷണം",
      "nav.departments": "വിഭാഗങ്ങൾ",
      "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
      "nav.medicalServices": "മെഡിക്കൽ സേവനങ്ങൾ",
      "nav.findDoctor": "ഡോക്ടറെ കണ്ടെത്തുക",
      "nav.faq": "പതിവ് ചോദ്യങ്ങൾ",
      "btn.bookAppointment": "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
      "btn.emergency": "അടിയന്തരം",
      "fd.home": "ഹോം",
      "fd.title": "ഡോക്ടറെ കണ്ടെത്തുക",
      "fd.subtitle": "ഡോക്ടറുടെ പേര്, സ്പെഷ്യാലിറ്റി, ലക്ഷണങ്ങൾ, അവസ്ഥ, വിഭാഗം അല്ലെങ്കിൽ സേവനം കൊണ്ട് തിരയുക.",
      "fd.askQuestion": "ഒരു ചോദ്യം ചോദിക്കുക",
      "fd.searchDoctors": "ഡോക്ടർമാരെ തിരയുക",
      "fd.searchAria": "ഡോക്ടർമാർ, സ്പെഷ്യാലിറ്റികൾ, ലക്ഷണങ്ങൾ തിരയുക",
      "fd.emergencyAlert": 'ഇത് ഗുരുതരമായ അടിയന്തരമാണെങ്കിൽ, <a href="index.html#emergency">ഉടൻ അടിയന്തര പരിചരണം ബന്ധപ്പെടുക</a>.',
      "fd.continueProfile": "രോഗി പ്രൊഫൈലുമായി തുടരുക",
      "fd.profileDesc": "നിങ്ങളുടെ സന്ദർശന ചരിത്രത്തെ അടിസ്ഥാനമാക്കി വ്യക്തിഗത ഡോക്ടർ ശുപാർശകൾ കാണാൻ സൈൻ ഇൻ ചെയ്യുക.",
      "fd.demoLogin": "ഡെമോ ലോഗിൻ",
      "fd.guest": "അതിഥിയായി തുടരുക",
      "fd.dashboardEyebrow": "രോഗി ഡാഷ്‌ബോർഡ്",
      "fd.welcome": "തിരികെ സ്വാഗതം, അരുണ്",
      "fd.logout": "ലോഗ് ഔട്ട്",
      "fd.prevConsultant": "മുൻ കൺസൾട്ടന്റ്",
      "fd.recentConcern": "സമീപകാല ആശങ്ക",
      "fd.lastVisit": "അവസാന സന്ദർശനം",
      "fd.upcoming": "വരാനിരിക്കുന്ന നിർദേശം",
      "fd.chestDiscomfort": "ഛാതിയിലെ അസ്വസ്ഥത",
      "fd.loggedSymptom": "രേഖപ്പെടുത്തിയ ലക്ഷണം",
      "fd.outPatient": "ഔട്ട്-പേഷ്യന്റ്",
      "fd.followUpSuggest": "ഫോളോ-അപ്പ് കൺസൾട്ടേഷൻ ശുപാർശിക്കുന്നു",
      "fd.tabRecommended": "ശുപാർശിത ഡോക്ടർമാർ",
      "fd.tabPrevious": "മുൻ ഡോക്ടർമാർ",
      "fd.tabHistory": "കൺസൾട്ടേഷൻ ചരിത്രം",
      "fd.tabSaved": "സേവ് ചെയ്ത വിഭാഗങ്ങൾ",
      "fd.insightsEyebrow": "ആരോഗ്യ ഉൾക്കാഴ്ചകൾ",
      "fd.insightsTitle": "നിങ്ങളുടെ പ്രദേശത്ത് പതിവായി തിരയുന്നത്",
      "fd.insightsHelper": "പ്രാദേശിക സാധാരണ തിരയലുകളും സീസണൽ ആരോഗ്യ ആവശ്യങ്ങളും അടിസ്ഥാനമാക്കി.",
      "fd.specialityEyebrow": "സ്പെഷ്യാലിറ്റി പ്രകാരം ബ്രൗസ് ചെയ്യുക",
      "fd.specialityTitle": "പതിവായി തിരയുന്ന സ്പെഷ്യാലിറ്റികൾ",
      "fd.doctorsEyebrow": "ഡോക്ടർമാർ",
      "fd.doctorsTitle": "ലഭ്യമായ സ്പെഷ്യലിസ്റ്റുകൾ",
      "fd.doctorsCount": "4 ഡോക്ടർമാർ",
      "fd.noResults": "നിങ്ങളുടെ തിരയലുമായി പൊരുത്തപ്പെടുന്ന ഡോക്ടർമാർ ഇല്ല.",
      "fd.bookInClinic": "ക്ലിനിക്കിൽ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
      "fd.bookVideo": "വീഡിയോ കൺസൾട്ടേഷൻ ബുക്ക് ചെയ്യുക",
      "fd.yearsExp": "വർഷത്തെ അനുഭവം",
      "fd.expertise": "വിദഗ്ധത:",
      "fd.toastGuest": "അതിഥിയായി തുടരുന്നു — ഡെമോയിൽ വ്യക്തിഗത ഫീച്ചറുകൾ മറച്ചിരിക്കുന്നു.",
      "fd.searchPrefix": "തിരയുക",
    },
    kn: {
      "lang.label": "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
      "nav.patientCare": "ರೋಗಿ ಆರೈಕೆ",
      "nav.education": "ಶಿಕ್ಷಣ",
      "nav.research": "ಸಂಶೋಧನೆ",
      "nav.departments": "ವಿಭಾಗಗಳು",
      "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
      "nav.medicalServices": "ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "nav.findDoctor": "ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      "nav.faq": "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      "btn.bookAppointment": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
      "btn.emergency": "ತುರ್ತು",
      "fd.home": "ಮುಖಪುಟ",
      "fd.title": "ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      "fd.subtitle": "ವೈದ್ಯರ ಹೆಸರು, ವಿಶೇಷತೆ, ಲಕ್ಷಣಗಳು, ಸ್ಥಿತಿ, ವಿಭಾಗ ಅಥವಾ ಸೇವೆಯಿಂದ ಹುಡುಕಿ.",
      "fd.askQuestion": "ಪ್ರಶ್ನೆ ಕೇಳಿ",
      "fd.searchDoctors": "ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      "fd.searchAria": "ವೈದ್ಯರು, ವಿಶೇಷತೆಗಳು, ಲಕ್ಷಣಗಳು ಹುಡುಕಿ",
      "fd.emergencyAlert": 'ಇದು ಗಂಭೀರ ತುರ್ತು ಸ್ಥಿತಿಯಾದರೆ, <a href="index.html#emergency">ತಕ್ಷಣ ತುರ್ತು ಆರೈಕೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ</a>.',
      "fd.continueProfile": "ರೋಗಿ ಪ್ರೊಫೈಲ್‌ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
      "fd.profileDesc": "ನಿಮ್ಮ ಭೇಟಿ ಇತಿಹಾಸದ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ವೈದ್ಯ ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಿ.",
      "fd.demoLogin": "ಡೆಮೋ ಲಾಗಿನ್",
      "fd.guest": "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ",
      "fd.dashboardEyebrow": "ರೋಗಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "fd.welcome": "ಮತ್ತೆ ಸ್ವಾಗತ, ಅರುಣ್",
      "fd.logout": "ಲಾಗ್ ಔಟ್",
      "fd.prevConsultant": "ಹಿಂದಿನ ಸಲಹೆಗಾರ",
      "fd.recentConcern": "ಇತ್ತೀಚಿನ ಕಾಳಜಿ",
      "fd.lastVisit": "ಕೊನೆಯ ಭೇಟಿ",
      "fd.upcoming": "ಮುಂದಿನ ಸಲಹೆ",
      "fd.chestDiscomfort": "ಛಾತಿಯ ಅಸ್ವಸ್ಥತೆ",
      "fd.loggedSymptom": "ದಾಖಲಾದ ಲಕ್ಷಣ",
      "fd.outPatient": "ಹೊರರೋಗಿ",
      "fd.followUpSuggest": "ಫಾಲೋ-ಅಪ್ ಸಲಹೆ ಶಿಫಾರಸು",
      "fd.tabRecommended": "ಶಿಫಾರಸು ಮಾಡಿದ ವೈದ್ಯರು",
      "fd.tabPrevious": "ಹಿಂದಿನ ವೈದ್ಯರು",
      "fd.tabHistory": "ಸಲಹೆ ಇತಿಹಾಸ",
      "fd.tabSaved": "ಉಳಿಸಿದ ವಿಭಾಗಗಳು",
      "fd.insightsEyebrow": "ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
      "fd.insightsTitle": "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಹುಡುಕಲಾಗುವುದು",
      "fd.insightsHelper": "ಪ್ರಾದೇಶಿಕ ಸಾಮಾನ್ಯ ಹುಡುಕಾಟಗಳು ಮತ್ತು ಋತುಮಾನ ಆರೋಗ್ಯ ಅಗತ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ.",
      "fd.specialityEyebrow": "ವಿಶೇಷತೆಯಿಂದ ಬ್ರೌಸ್ ಮಾಡಿ",
      "fd.specialityTitle": "ಪದೇ ಪದೇ ಹುಡುಕಲಾಗುವ ವಿಶೇಷತೆಗಳು",
      "fd.doctorsEyebrow": "ವೈದ್ಯರು",
      "fd.doctorsTitle": "ಲಭ್ಯವಿರುವ ತಜ್ಞರು",
      "fd.doctorsCount": "4 ವೈದ್ಯರು",
      "fd.noResults": "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ವೈದ್ಯರು ಇಲ್ಲ.",
      "fd.bookInClinic": "ಕ್ಲಿನಿಕ್‌ನಲ್ಲಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
      "fd.bookVideo": "ವೀಡಿಯೊ ಸಲಹೆ ಬುಕ್ ಮಾಡಿ",
      "fd.yearsExp": "ವರ್ಷಗಳ ಅನುಭವ",
      "fd.expertise": "ತಜ್ಞತೆ:",
      "fd.toastGuest": "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯುತ್ತಿದ್ದೀರಿ — ಡೆಮೋದಲ್ಲಿ ವೈಯಕ್ತಿಕ ವೈಶಿಷ್ಟ್ಯಗಳು ಮರೆಮಾಡಲಾಗಿದೆ.",
      "fd.searchPrefix": "ಹುಡುಕಿ",
    },
    bn: {
      "lang.label": "ভাষা নির্বাচন করুন",
      "nav.patientCare": "রোগী সেবা",
      "nav.education": "শিক্ষা",
      "nav.research": "গবেষণা",
      "nav.departments": "বিভাগ",
      "nav.about": "আমাদের সম্পর্কে",
      "nav.medicalServices": "চিকিৎসা সেবা",
      "nav.findDoctor": "ডাক্তার খুঁজুন",
      "nav.faq": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
      "btn.bookAppointment": "অ্যাপয়েন্টমেন্ট বুক করুন",
      "btn.emergency": "জরুরি",
      "fd.home": "হোম",
      "fd.title": "ডাক্তার খুঁজুন",
      "fd.subtitle": "ডাক্তারের নাম, বিশেষত্ব, লক্ষণ, অবস্থা, বিভাগ বা সেবা দিয়ে খুঁজুন।",
      "fd.askQuestion": "একটি প্রশ্ন জিজ্ঞাসা করুন",
      "fd.searchDoctors": "ডাক্তার খুঁজুন",
      "fd.searchAria": "ডাক্তার, বিশেষত্ব, লক্ষণ খুঁজুন",
      "fd.emergencyAlert": 'এটি গুরুতর জরুরি হলে, <a href="index.html#emergency">অবিলম্বে জরুরি সেবায় যোগাযোগ করুন</a>।',
      "fd.continueProfile": "রোগী প্রোফাইল দিয়ে চালিয়ে যান",
      "fd.profileDesc": "আপনার পরিদর্শনের ইতিহাস অনুযায়ী ব্যক্তিগত ডাক্তার সুপারিশ দেখতে সাইন ইন করুন।",
      "fd.demoLogin": "ডেমো লগইন",
      "fd.guest": "অতিথি হিসাবে চালিয়ে যান",
      "fd.dashboardEyebrow": "রোগী ড্যাশবোর্ড",
      "fd.welcome": "আবার স্বাগতম, অরুণ",
      "fd.logout": "লগ আউট",
      "fd.prevConsultant": "পূর্ববর্তী পরামর্শদাতা",
      "fd.recentConcern": "সাম্প্রতিক উদ্বেগ",
      "fd.lastVisit": "শেষ পরিদর্শন",
      "fd.upcoming": "আসন্ন পরামর্শ",
      "fd.chestDiscomfort": "বুকে অস্বস্তি",
      "fd.loggedSymptom": "লগ করা লক্ষণ",
      "fd.outPatient": "বহির্মুখী রোগী",
      "fd.followUpSuggest": "ফলো-আপ পরামর্শের সুপারিশ",
      "fd.tabRecommended": "সুপারিশকৃত ডাক্তার",
      "fd.tabPrevious": "পূর্ববর্তী ডাক্তার",
      "fd.tabHistory": "পরামর্শের ইতিহাস",
      "fd.tabSaved": "সংরক্ষিত বিভাগ",
      "fd.insightsEyebrow": "স্বাস্থ্য অন্তর্দৃষ্টি",
      "fd.insightsTitle": "আপনার অঞ্চলে সাধারণত খোঁজা হয়",
      "fd.insightsHelper": "আঞ্চলিক সাধারণ অনুসন্ধান এবং মৌসুমি স্বাস্থ্য প্রয়োজনের উপর ভিত্তি করে।",
      "fd.specialityEyebrow": "বিশেষত্ব অনুযায়ী ব্রাউজ করুন",
      "fd.specialityTitle": "প্রায়শই খোঁজা বিশেষত্ব",
      "fd.doctorsEyebrow": "ডাক্তার",
      "fd.doctorsTitle": "উপলব্ধ বিশেষজ্ঞ",
      "fd.doctorsCount": "৪ জন ডাক্তার",
      "fd.noResults": "আপনার অনুসন্ধানের সাথে মিলে যাওয়া ডাক্তার নেই।",
      "fd.bookInClinic": "ক্লিনিকে অ্যাপয়েন্টমেন্ট বুক করুন",
      "fd.bookVideo": "ভিডিও পরামর্শ বুক করুন",
      "fd.yearsExp": "বছরের অভিজ্ঞতা",
      "fd.expertise": "দক্ষতা:",
      "fd.toastGuest": "অতিথি হিসাবে চালিয়ে যাচ্ছেন — ডেমোতে ব্যক্তিগত বৈশিষ্ট্য লুকানো।",
      "fd.searchPrefix": "খুঁজুন",
    },
    mr: {
      "lang.label": "भाषा निवडा",
      "nav.patientCare": "रुग्ण सेवा",
      "nav.education": "शिक्षण",
      "nav.research": "संशोधन",
      "nav.departments": "विभाग",
      "nav.about": "आमच्याबद्दल",
      "nav.medicalServices": "वैद्यकीय सेवा",
      "nav.findDoctor": "डॉक्टर शोधा",
      "nav.faq": "वारंवार विचारले जाणारे प्रश्न",
      "btn.bookAppointment": "अपॉइंटमेंट बुक करा",
      "btn.emergency": "आपत्कालीन",
      "fd.home": "मुख्यपृष्ठ",
      "fd.title": "डॉक्टर शोधा",
      "fd.subtitle": "डॉक्टराचे नाव, विशेषता, लक्षणे, स्थिती, विभाग किंवा सेवा यानुसार शोधा.",
      "fd.askQuestion": "प्रश्न विचारा",
      "fd.searchDoctors": "डॉक्टर शोधा",
      "fd.searchAria": "डॉक्टर, विशेषता, लक्षणे शोधा",
      "fd.emergencyAlert": 'हे गंभीर आपत्कालीन असल्यास, <a href="index.html#emergency">त्वरित आपत्कालीन सेवेशी संपर्क साधा</a>.',
      "fd.continueProfile": "रुग्ण प्रोफाइलसह सुरू ठेवा",
      "fd.profileDesc": "तुमच्या भेटीच्या इतिहासावर आधारित वैयक्तिक डॉक्टर शिफारसी पाहण्यासाठी साइन इन करा.",
      "fd.demoLogin": "डेमो लॉगिन",
      "fd.guest": "अतिथी म्हणून सुरू ठेवा",
      "fd.dashboardEyebrow": "रुग्ण डॅशबोर्ड",
      "fd.welcome": "पुन्हा स्वागत, अरुण",
      "fd.logout": "लॉग आउट",
      "fd.prevConsultant": "मागील सल्लागार",
      "fd.recentConcern": "अलीकडील चिंता",
      "fd.lastVisit": "शेवटची भेट",
      "fd.upcoming": "आगामी सूचना",
      "fd.chestDiscomfort": "छातीत अस्वस्थता",
      "fd.loggedSymptom": "नोंदवलेले लक्षण",
      "fd.outPatient": "बाह्य रुग्ण",
      "fd.followUpSuggest": "फॉलो-अप सल्ला शिफारस",
      "fd.tabRecommended": "शिफारस केलेले डॉक्टर",
      "fd.tabPrevious": "मागील डॉक्टर",
      "fd.tabHistory": "सल्ला इतिहास",
      "fd.tabSaved": "जतन केलेले विभाग",
      "fd.insightsEyebrow": "आरोग्य अंतर्दृष्टी",
      "fd.insightsTitle": "तुमच्या प्रदेशात सामान्यपणे शोधले जाणारे",
      "fd.insightsHelper": "प्रादेशिक सामान्य शोध आणि हंगामी आरोग्य गरजांवर आधारित.",
      "fd.specialityEyebrow": "विशेषतेनुसार ब्राउझ करा",
      "fd.specialityTitle": "वारंवार शोधल्या जाणाऱ्या विशेषता",
      "fd.doctorsEyebrow": "डॉक्टर",
      "fd.doctorsTitle": "उपलब्ध तज्ञ",
      "fd.doctorsCount": "४ डॉक्टर",
      "fd.noResults": "तुमच्या शोधाशी जुळणारे डॉक्टर नाहीत.",
      "fd.bookInClinic": "क्लिनिकमध्ये अपॉइंटमेंट बुक करा",
      "fd.bookVideo": "व्हिडिओ सल्ला बुक करा",
      "fd.yearsExp": "वर्षांचा अनुभव",
      "fd.expertise": "तज्ज्ञता:",
      "fd.toastGuest": "अतिथी म्हणून सुरू — डेमोमध्ये वैयक्तिक वैशिष्ट्ये लपवली आहेत.",
      "fd.searchPrefix": "शोधा",
    },
  };

  const SEARCH_EXAMPLES = {
    en: ["cardiology", "fever and chest pain", "pediatrician", "bone marrow transplant", "women's health", "neurology", "video consultation"],
    hi: ["हृदय रोग", "बुखार और छाती दर्द", "बाल रोग विशेषज्ञ", "अस्थि मज्जा प्रत्यारोपण", "महिला स्वास्थ्य", "न्यूरोलॉजी", "वीडियो परामर्श"],
    ta: ["இருதயவியல்", "காய்ச்சல் மற்றும் மார்பு வலி", "குழந்தை மருத்துவர்", "எலும்பு மஜ்ஜை மாற்று", "பெண்கள் நலம்", "நரம்பியல்", "வீடியோ ஆலோசனை"],
    te: ["కార్డియాలజీ", "జ్వరం మరియు ఛాతీ నొప్పి", "పీడియాట్రిషియన్", "బోన్ మారో ట్రాన్స్‌ప్లాంట్", "మహిళా ఆరోగ్యం", "న్యూరాలజీ", "వీడియో కన్సల్టేషన్"],
    ml: ["ഹൃദ്രോഗം", "പനിയും നെഞ്ചുവേദനയും", "ശിശുരോഗ വിദഗ്ധൻ", "അസ്ഥിമജ്ജാ മാറ്റം", "സ്ത്രീ ആരോഗ്യം", "ന്യൂറോളജി", "വീഡിയോ കൺസൾട്ടേഷൻ"],
    kn: ["ಹೃದಯರೋಗ", "ಜ್ವರ ಮತ್ತು ಛಾತಿ ನೋವು", "ಮಕ್ಕಳ ವೈದ್ಯ", "ಮೂಳೆ ಮಜ್ಜಾ ಕಸಿ", "ಮಹಿಳಾ ಆರೋಗ್ಯ", "ನ್ಯೂರಾಲಜಿ", "ವೀಡಿಯೊ ಸಲಹೆ"],
    bn: ["কার্ডিওলজি", "জ্বর ও বুকে ব্যথা", "শিশু বিশেষজ্ঞ", "অস্থি মজ্জা প্রতিস্থাপন", "নারী স্বাস্থ্য", "নিউরোলজি", "ভিডিও পরামর্শ"],
    mr: ["हृदयरोग", "ताप आणि छातीत वेदना", "बालरोगतज्ज्ञ", "अस्थिमज्जा प्रत्यारोपण", "महिला आरोग्य", "न्यूरोलॉजी", "व्हिडिओ सल्ला"],
  };

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && T[saved] ? saved : "en";
  }

  function t(key, lang) {
    const l = lang || getLang();
    return T[l]?.[key] ?? T.en[key] ?? key;
  }

  function applyLanguage(lang) {
    if (!T[lang]) lang = "en";
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.body.classList.remove("is-lang-en", "is-lang-hi", "is-lang-ta", "is-lang-te", "is-lang-ml", "is-lang-kn", "is-lang-bn", "is-lang-mr");
    document.body.classList.add(`is-lang-${lang}`);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = T[lang][key];
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      const value = T[lang][key];
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.dataset.i18nAria;
      const value = T[lang][key];
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    const select = document.getElementById("langSelect");
    if (select) {
      select.value = lang;
      select.setAttribute("aria-label", t("lang.label", lang));
    }

    document.querySelectorAll("[data-lang-select]").forEach((el) => {
      el.value = lang;
      el.setAttribute("aria-label", t("lang.label", lang));
    });

    document.dispatchEvent(new CustomEvent("cmc:languagechange", { detail: { lang } }));
  }

  function buildLangOptions() {
    return Object.entries(LANG_META)
      .map(([code, meta]) => `<option value="${code}">${meta.native}</option>`)
      .join("");
  }

  function bindLangSelect(select) {
    select.value = getLang();
    select.setAttribute("aria-label", t("lang.label"));
    select.addEventListener("change", () => applyLanguage(select.value));
  }

  function injectLanguageSwitcher() {
    const navActions = document.querySelector(".nav-actions");
    if (!navActions || document.getElementById("langSelect")) return;

    const wrap = document.createElement("div");
    wrap.className = "lang-switcher lang-switcher--header";
    wrap.innerHTML = `
      <label class="lang-switcher__label" for="langSelect">
        <svg class="lang-switcher__icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>
        <select id="langSelect" class="lang-switcher__select" data-lang-select aria-label="Choose language">
          ${buildLangOptions()}
        </select>
      </label>
    `;

    const menuToggle = navActions.querySelector(".menu-toggle");
    if (menuToggle) {
      navActions.insertBefore(wrap, menuToggle);
    } else {
      navActions.appendChild(wrap);
    }

    bindLangSelect(wrap.querySelector("#langSelect"));

    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu && !mobileMenu.querySelector("[data-lang-select]")) {
      const mobileLang = document.createElement("div");
      mobileLang.className = "mobile-lang";
      mobileLang.innerHTML = `
        <label class="mobile-lang__label" for="langSelectMobile">
          <svg class="mobile-lang__icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>
          <span class="mobile-lang__text" data-i18n="lang.label">Choose language</span>
        </label>
        <select id="langSelectMobile" class="mobile-lang__select" data-lang-select aria-label="Choose language">
          ${buildLangOptions()}
        </select>
      `;
      mobileMenu.insertBefore(mobileLang, mobileMenu.firstChild);
      bindLangSelect(mobileLang.querySelector("#langSelectMobile"));
    }
  }

  function init() {
    injectLanguageSwitcher();
    applyLanguage(getLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.CMC_I18N = { getLang, applyLanguage, t, SEARCH_EXAMPLES, LANG_META };
})();
