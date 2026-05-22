const CAMERAS = [
  // --- CANON ---
  "Canon AE-1", "Canon AE-1 Program", "Canon A-1", "Canon F-1", "Canon New F-1",
  "Canon AL-1", "Canon T50", "Canon T70", "Canon T80", "Canon T90", "Canon EOS 1", "Canon EOS 3",
  "Canon EOS 5", "Canon EOS 10s", "Canon EOS 30", "Canon EOS 50E", "Canon EOS 600",
  "Canon EOS 620", "Canon EOS 650", "Canon EOS 700", "Canon EOS 850", "Canon EOS 1N", "Canon EOS 1V",
  "Canon P", "Canon VI-L", "Canon 7", "Canon 7s", "Canon Canonet QL17",
  "Canon Canonet QL17 GIII", "Canon Canonet QL19", "Canon Canonet 28",
  "Canon Sure Shot AF35M", "Canon Sure Shot Supreme", "Canon Sure Shot Owl", "Canon Sure Shot Max",
  "Canon Sure Shot Tele", "Canon Sure Shot TeleMax", "Canon Sure Shot WP-1", "Canon Sure Shot Z115", "Canon Sure Shot Z135",
  "Canon Autoboy Luna", "Canon Autoboy S", "Canon Autoboy SII", "Canon Autoboy Jet", "Canon Autoboy Mini T",
  "Canon Prima Zoom 76", "Canon Prima Super 115", "Canon Prima Super 135", "Canon Prima BF-800",
  
  // --- NIKON ---
  "Nikon F", "Nikon F2", "Nikon F2AS", "Nikon F3", "Nikon F3HP", "Nikon F4", "Nikon F5",
  "Nikon F6", "Nikon FM", "Nikon FM2", "Nikon FM2n", "Nikon FM3A", "Nikon FE", "Nikon FE2",
  "Nikon FE10", "Nikon FA", "Nikon EM", "Nikon FG", "Nikon FG-20", "Nikon N2000",
  "Nikon N6006", "Nikon N8008", "Nikon N90s", "Nikon F100", "Nikon F80", "Nikon F75",
  "Nikon S2", "Nikon SP", "Nikon S3", "Nikon S4",
  "Nikon L35AF", "Nikon L35AFII", "Nikon One Touch", "Nikon TW Zoom", "Nikon 35Ti", "Nikon 28Ti",
  "Nikon Lite Touch AF", "Nikon Lite Touch Zoom 70", "Nikon Lite Touch Zoom 120ED", "Nikon Lite Touch Zoom 150ED",
  "Nikon AF600", "Nikon Fun Touch", "Nikon Zoom-Touch 800", "Nikon One Touch Zoom 90",
  
  // --- PENTAX ---
  "Pentax K1000", "Pentax KX", "Pentax KM", "Pentax ME", "Pentax ME Super", "Pentax MX",
  "Pentax MG", "Pentax MV", "Pentax MV-1", "Pentax A3", "Pentax P30", "Pentax P50", "Pentax Super A", 
  "Pentax LX", "Pentax 645", "Pentax 645N", "Pentax 67", "Pentax 6x7", "Pentax 67II", 
  "Pentax Z-1p", "Pentax PZ-1p", "Pentax Auto 110", "Pentax IQZoom 60-X", "Pentax Espio 120SW",
  "Pentax IQZoom 70", "Pentax IQZoom 90", "Pentax IQZoom 115V", "Pentax IQZoom 140",
  "Pentax Espio 115M", "Pentax 120Mi", "Pentax Espio 140", "Pentax Espio 160", "Pentax Espio 200",
  "Pentax PC35AF", "Pentax Sport",
  
  // --- MINOLTA ---
  "Minolta X-700", "Minolta X-570", "Minolta X-370", "Minolta XG-M", "Minolta XD-11",
  "Minolta XD-7", "Minolta XD-5", "Minolta SRT-101", "Minolta SRT-202", "Minolta Maxxum 7000",
  "Minolta Maxxum 9000", "Minolta Maxxum 5", "Minolta Dynax 7", "Minolta Dynax 9",
  "Minolta Hi-Matic 7s", "Minolta Hi-Matic 9", "Minolta Hi-Matic E", "Minolta Hi-Matic F",
  "Minolta AF-C", "Minolta Freedom Zoom 90", "Minolta Freedom Explorer", "Minolta TC-1",
  
  // --- OLYMPUS ---
  "Olympus OM-1", "Olympus OM-1N", "Olympus OM-2", "Olympus OM-2N", "Olympus OM-2SP",
  "Olympus OM-3", "Olympus OM-3Ti", "Olympus OM-4", "Olympus OM-4Ti", "Olympus OM-10",
  "Olympus OM-20", "Olympus OM-30", "Olympus OM-40", "Olympus OM-PC",
  "Olympus Stylus", "Olympus Stylus Epic mju ii", "Olympus Stylus Epic Zoom 80", "Olympus Stylus Epic Zoom 115",
  "Olympus mju-I", "Olympus mju-II Zoom 80", "Olympus mju-III Wide 100", "Olympus mju-III 120", "Olympus mju-III 150",
  "Olympus XA", "Olympus XA2", "Olympus XA3", "Olympus XA4", "Olympus Trip 35", "Olympus Trip AF 31", "Olympus AF-10", 
  "Olympus Pen F", "Olympus Pen FT",
  
  // --- LEICA ---
  "Leica M2", "Leica M3", "Leica M4", "Leica M4-P", "Leica M4-2", "Leica M5", "Leica M6",
  "Leica M6 TTL", "Leica M7", "Leica MP", "Leica CL", "Leica M-A", "Leica III", "Leica IIIc",
  "Leica IIIf", "Leica IIIg", "Leica R4", "Leica R5", "Leica R6", "Leica R7", "Leica R8", "Leica R9",
  
  // --- CONTAX ---
  "Contax G1", "Contax G2", "Contax T2", "Contax T3", "Contax TVS", "Contax TVS II",
  "Contax RTS", "Contax RTS II", "Contax RTS III", "Contax S2", "Contax 645",
  "Contax Aria", "Contax 139 Quartz", "Contax 167MT", "Contax AX",
  
  // --- HASSELBLAD ---
  "Hasselblad 500C", "Hasselblad 500C/M", "Hasselblad 503CX", "Hasselblad 503CW",
  "Hasselblad 501C", "Hasselblad SWC", "Hasselblad XPan", "Hasselblad XPan II",
  "Hasselblad 1600F", "Hasselblad 1000F", "Hasselblad 500C", "Hasselblad 500C/M", 
  "Hasselblad 500EL", "Hasselblad 500EL/M", "Hasselblad 500ELX", "Hasselblad 503CX", 
  "Hasselblad 503CXi", "Hasselblad 503CW", "Hasselblad 501C", "Hasselblad 501CM", 
  "Hasselblad 2000FC", "Hasselblad 2000FCW", "Hasselblad 2003FCW", "Hasselblad 201F", 
  "Hasselblad 203FE", "Hasselblad 205TCC", "Hasselblad 205FCC", "Hasselblad SWC", 
  "Hasselblad SWC/M", "Hasselblad 903SWC", "Hasselblad 905SWC", "Hasselblad FlexBody", 
  "Hasselblad ArcBody", "Hasselblad XPan", "Hasselblad XPan II", "Hasselblad H1", "Hasselblad H2",
  
  // --- MAMIYA ---
  "Mamiya RB67", "Mamiya RB67 Pro S", "Mamiya RZ67", "Mamiya RZ67 Pro II",
  "Mamiya 645 Pro", "Mamiya 645 Super", "Mamiya 645 AF", "Mamiya 7", "Mamiya 7II", "Mamiya 6",
  "Mamiya C330", "Mamiya C220", "Mamiya Universal Press",
  "Mamiya Six", "Mamiya Six IV", "Mamiya Six V", "Mamiya Six K", "Mamiya Six Automat",
  "Mamiya M645", "Mamiya M645 1000S", "Mamiya M645J", "Mamiya 645 Super", "Mamiya 645 Pro", 
  "Mamiya 645 Pro TL", "Mamiya 645 AF", "Mamiya 645 AFD", "Mamiya RB67 Professional", 
  "Mamiya RB67 Pro-S", "Mamiya RB67 Pro-SD", "Mamiya RZ67 Professional", "Mamiya RZ67 Pro II", 
  "Mamiya RZ67 Pro IID", "Mamiya 6 (Rangefinder)", "Mamiya 6MF", "Mamiya 7", "Mamiya 7II", 
  "Mamiya Press", "Mamiya Press G", "Mamiya Super 23", "Mamiya Universal Press",
  "Mamiyaflex Junior", "Mamiyaflex Automat A", "Mamiyaflex C Professional", "Mamiya C2", 
  "Mamiya C3", "Mamiya C22", "Mamiya C33", "Mamiya C220", "Mamiya C330", "Mamiya C330f", "Mamiya C330s",
  
  // --- BRONICA ---
  "Bronica ETR", "Bronica ETRS", "Bronica ETRSi", "Bronica SQ-A", "Bronica SQ-Ai",
  "Bronica GS-1", "Bronica S2A",
  "Bronica Z", "Bronica D", "Bronica S", "Bronica S2", "Bronica S2A", "Bronica EC", 
  "Bronica EC-TL", "Bronica EC-TL II", "Bronica ETR", "Bronica ETRC", "Bronica ETRS", 
  "Bronica ETRSi", "Bronica SQ", "Bronica SQ-A", "Bronica SQ-Am", "Bronica SQ-Ai", 
  "Bronica SQ-B", "Bronica GS-1", "Bronica RF645",

  // --- POLAROID ---
"Polaroid SX-70",
"Polaroid 1000",
"Polaroid SLR 680",
"Polaroid Sun 660",
"Polaroid Colorpack II",
"Polaroid Colorpack 1000",
"Polaroid ProPack",
"Polaroid Spirit 600 CL",
"Polaroid 600 SE",
"Polaroid LandCamera 240",
"Polaroid LandCamera 330",
"Polaroid LandCamera 350",
"Polaroid LandCamera 100",
"Polaroid LandCamera 110A",
"Polaroid LandCamera 190",
"Polaroid LandCamera 195",
"Polaroid LandCamera 250",
"Polaroid OneStep",
  
  // --- FUJIFILM ---
  "Fujifilm Klasse", "Fujifilm Klasse S", "Fujifilm Klasse W", "Fujifilm Natura S",
  "Fujifilm Tiara", "Fujifilm DL-500", "Fujifilm GA645", "Fujifilm GW690", "Fujifilm GW690II",
  "Fujifilm GW690III", "Fujifilm GSW690", "Fujifilm TX-1", "Fujifilm TX-2",
  "Fujifilm GW670", "Fujifilm GW670II", "Fujifilm GW670III", "Fujifilm GSW670", 
  "Fujifilm GW680", "Fujifilm GSW690II", "Fujifilm GSW690III", "Fujifilm GS645", 
  "Fujifilm GS645W", "Fujifilm GA645W", "Fujifilm GA645Zi", "Fujifilm GX617", 
  "Fujifilm GX680", "Fujifilm GX680II", "Fujifilm GX680III",
  
  // --- YASHICA ---
  "Yashica T4", "Yashica T5", "Yashica Electro 35", "Yashica Electro 35 GSN",
  "Yashica FX-3 Super 2000", "Yashica FX-D", "Yashica FR-I", "Yashica Mat-124G", "Yashica 635",
  "Yashica-Mat", "Yashica-Mat LM", "Yashica-Mat EM", "Yashica 24", "Yashica 12", "Yashica-Mat 124", 
  "Yashica A", "Yashica B", "Yashica C", "Yashica D",
  
  // --- ROLLEI ---
  "Rollei 35", "Rollei 35S", "Rollei 35T", "Rollei 35SE", "Rollei B 35",
  "Rolleiflex 2.8F", "Rolleiflex 3.5F", "Rolleiflex Automat", "Rolleicord V", "Rolleicord Va",
  "Rolleiflex 3.5", "Rolleiflex 3.5A", "Rolleiflex 3.5B", "Rolleiflex 3.5C", "Rolleiflex 3.5E", 
  "Rolleiflex 3.5F", "Rolleiflex 2.8A", "Rolleiflex 2.8B", "Rolleiflex 2.8C", "Rolleiflex 2.8D", 
  "Rolleiflex 2.8E", "Rolleiflex 2.8F", "Rolleiflex 2.8GX", "Rolleiflex 2.8FX", "Tele-Rolleiflex", 
  "Wide-Angle Rolleiflex", "Rolleiflex T", "Rolleiflex Magic", "Rolleiflex Magic II", 
  "Rolleicord I", "Rolleicord Ia", "Rolleicord II", "Rolleicord III", "Rolleicord IV", 
  "Rolleicord V", "Rolleicord Va", "Rolleicord Vb", "Rollei SL66", "Rollei SL66E", 
  "Rollei SL66X", "Rollei SLX", "Rollei 6002", "Rollei 6006", "Rollei 6008 Professional",
  
  // --- SOVIET ---
  "Zenit E", "Zenit 12xp", "Zenit TTL", "FED 2", "FED 3", "FED 4", "FED 5",
  "Zorki 4", "Zorki 4K", "Zorki 1", "Zorki S", "Kiev 4", "Kiev 4A", "Kiev 60", "Kiev 88",
  "Lomo LC-A", "Lubitel 166B", "Moskva 5", "Kiev 6C", "Kiev 88CM", "Kiev 90", "Moskva-2", 
  "Moskva-4", "Lubitel", "Lubitel-2", "Lubitel-166", "Lubitel-166 Universal", "Salyut", "Salyut-C",
  
  // --- OTHERS & MISC ---
  "Ricoh GR1", "Ricoh GR1s", "Ricoh GR1v", "Ricoh GR21", "Ricoh KR-5", "Ricoh XR-7",
  "Konica Hexar AF", "Konica Auto S2", "Konica Big Mini", "Konica Big Mini F",
  "Voigtlander Bessa R", "Voigtlander Bessa R2", "Voigtlander Bessa R3A",
  "Kodak Brownie", "Kodak M35", "Kodak Ektar H35", "Kodak Retina IIIc", "Kodak Retina IIIa", "Kodak Retina II", "Kodak Retina",
  "Argus C3", "Agfa Isolette", "Chinon CE-4", "Cosina Hi-Lite", "Vivitar V3800N",
  "Exakta Varex IIa", "Graflex Speed Graphic", "Pentacon Six", "Pentacon Six TL", "Exakta 66", "Kowa Six", "Kowa Six MM", "Kowa Super 66", 
  "Plaubel Makina 67", "Plaubel Makina 670", "Plaubel Makina W67", "Agfa Isolette I", "Agfa Isolette II", 
  "Agfa Isolette III", "Agfa Record III", "Voigtlander Bessa III", "Voigtlander Perkeo I", 
  "Voigtlander Perkeo II", "Minolta Autocord", "Brooks Veriwide", "Gilde 617", "Linhof Technika 70"
];

export default CAMERAS;