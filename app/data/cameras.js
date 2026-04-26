// 200 film cameras: SLRs, rangefinders, point-and-shoots
const CAMERAS = [
    // Canon SLRs
    "Canon AE-1", "Canon AE-1 Program", "Canon A-1", "Canon F-1", "Canon New F-1",
    "Canon AL-1", "Canon T50", "Canon T70", "Canon T90", "Canon EOS 1", "Canon EOS 3",
    "Canon EOS 5", "Canon EOS 10s", "Canon EOS 30", "Canon EOS 50E", "Canon EOS 600",
    "Canon EOS 620", "Canon EOS 650", "Canon EOS 700", "Canon EOS 850",
    // Canon Rangefinders
    "Canon P", "Canon VI-L", "Canon 7", "Canon 7s", "Canon Canonet QL17",
    "Canon Canonet QL17 GIII", "Canon Canonet QL19", "Canon Canonet 28",
    // Canon P&S
    "Canon Sure Shot AF35M", "Canon Sure Shot Supreme", "Canon Sure Shot Owl",
    "Canon Autoboy Luna", "Canon Autoboy S", "Canon Autoboy SII", "Canon Prima Zoom 76",
    // Nikon SLRs
    "Nikon F", "Nikon F2", "Nikon F2AS", "Nikon F3", "Nikon F3HP", "Nikon F4", "Nikon F5",
    "Nikon F6", "Nikon FM", "Nikon FM2", "Nikon FM2n", "Nikon FM3A", "Nikon FE", "Nikon FE2",
    "Nikon FE10", "Nikon FA", "Nikon EM", "Nikon FG", "Nikon FG-20", "Nikon N2000",
    "Nikon N6006", "Nikon N8008", "Nikon N90s", "Nikon F100", "Nikon F80",
    // Nikon Rangefinders
    "Nikon S2", "Nikon SP",
    // Nikon P&S
    "Nikon L35AF", "Nikon L35AFII", "Nikon One Touch", "Nikon TW Zoom",
    // Pentax SLRs
    "Pentax K1000", "Pentax KX", "Pentax KM", "Pentax ME", "Pentax ME Super", "Pentax MX",
    "Pentax MG", "Pentax A3", "Pentax P30", "Pentax P50", "Pentax Super A", "Pentax LX",
    "Pentax 645", "Pentax 67", "Pentax 6x7", "Pentax Z-1p", "Pentax PZ-1p",
    // Pentax P&S
    "Pentax IQZoom 60-X", "Pentax Espio 120SW",
    // Minolta SLRs
    "Minolta X-700", "Minolta X-570", "Minolta X-370", "Minolta XG-M", "Minolta XD-11",
    "Minolta XD-7", "Minolta SRT-101", "Minolta SRT-202", "Minolta Maxxum 7000",
    "Minolta Maxxum 9000", "Minolta Dynax 7", "Minolta Dynax 9",
    // Minolta Rangefinders & P&S
    "Minolta Hi-Matic 7s", "Minolta Hi-Matic 9", "Minolta AF-C", "Minolta Freedom Zoom 90",
    // Olympus SLRs
    "Olympus OM-1", "Olympus OM-1N", "Olympus OM-2", "Olympus OM-2N", "Olympus OM-2SP",
    "Olympus OM-3", "Olympus OM-3Ti", "Olympus OM-4", "Olympus OM-4Ti", "Olympus OM-10",
    "Olympus OM-20", "Olympus OM-30", "Olympus OM-40",
    // Olympus P&S
    "Olympus Stylus Epic", "Olympus Stylus", "Olympus XA", "Olympus XA2", "Olympus XA3",
    "Olympus mju-II", "Olympus Trip 35", "Olympus AF-10",
    // Leica Rangefinders
    "Leica M2", "Leica M3", "Leica M4", "Leica M4-P", "Leica M5", "Leica M6",
    "Leica M6 TTL", "Leica M7", "Leica MP", "Leica CL", "Leica M-A",
    // Leica SLRs
    "Leica R4", "Leica R5", "Leica R6", "Leica R7", "Leica R8",
    // Contax
    "Contax G1", "Contax G2", "Contax T2", "Contax T3", "Contax TVS",
    "Contax RTS", "Contax RTS II", "Contax RTS III", "Contax S2", "Contax 645",
    // Voigtlander
    "Voigtlander Bessa R", "Voigtlander Bessa R2", "Voigtlander Bessa R3A",
    "Voigtlander Bessa L", "Voigtlander Vito B",
    // Ricoh
    "Ricoh GR1", "Ricoh GR1s", "Ricoh GR1v", "Ricoh GR21", "Ricoh KR-5", "Ricoh XR-7",
    // Yashica
    "Yashica T4", "Yashica T5", "Yashica Electro 35", "Yashica FX-3 Super 2000",
    "Yashica FX-D", "Yashica FR-I", "Yashica Mat-124G",
    // Konica
    "Konica Hexar AF", "Konica Auto S2", "Konica Big Mini", "Konica Big Mini F",
    "Konica TC", "Konica T3",
    // Fujifilm
    "Fujifilm Klasse", "Fujifilm Klasse S", "Fujifilm Klasse W", "Fujifilm Natura S",
    "Fujifilm Tiara", "Fujifilm DL-500",
    // Zorki / FED / Soviet
    "Zorki 4", "Zorki 4K", "FED 2", "FED 3", "FED 5",
    // Zeiss
    "Zeiss Ikon", "Zeiss Contessa",
    // Rollei
    "Rollei 35", "Rollei 35S", "Rollei 35T", "Rollei 35SE", "Rollei B 35",
    // Topcon
    "Topcon RE Super", "Topcon Super D",
    // Miranda
    "Miranda Sensorex",
    // Praktica
    "Praktica MTL 5B", "Praktica B200",
    // Mamiya
    "Mamiya RB67", "Mamiya RZ67", "Mamiya 645 Pro", "Mamiya 7", "Mamiya 6",
    // Kodak
    "Kodak Brownie", "Kodak M35", "Kodak Ektar H35", "Kodak Brownie Number 2", "Kodak Brownie Reflex", "Kodak Retina", "Kodak Retina II", "Kodak Retina III",
  ];
  
  export default CAMERAS;