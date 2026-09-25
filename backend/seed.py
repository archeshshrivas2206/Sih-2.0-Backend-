"""Seeds the DB with data mirrored from the frontend's hardcoded arrays.
Run once:  python seed.py
Safe to re-run: it wipes and re-inserts."""
from db import engine, SessionLocal, Base
from models import Corridor, TacticalDay, StrategicWeek, SolverStatus, Defect, Bid, SmsMessage, ParsedBlock, FreightRake, CalmWindow,VulnerableSection, WeatherState, XaiDecision, AuditLedgerEntry

CORRIDORS = [
  {
    "id": "UP_MAIN", "name": "UP Main Line",
    "code": "NDLS ➔ AGC (KM 00.00 – 198.50)", "speed": "160 km/h (Group A)",
    "blocks": [
      {"id":"BLK-101","name":"Shadow Block #104: Tamping + Point M/C + OHE","start":0.5,"end":3.75,"type":"bundle","dept":"MULTI (P-Way + S&T + TRD)","km":"KM 127.40 – 129.20","privateNo":"PN-884102-DLI","tsr":"30 km/h Caution Order","details":"Synchronized possession: CSM-92 tamping, Point 104 Overhaul, and 25kV catenary wash in a single window.","hoursSaved":"3.2 hrs saved vs separate closures"},
      {"id":"TRN-12049","name":"12049 Gatimaan Express","start":6.1,"end":8.3,"type":"passenger","dept":"PASSENGER","km":"Through Transit (HZM-AGC)","tsr":"Normal 160 km/h","details":"Flagship priority express train. Non-stop corridor allocation with 15-min safety headway."},
      {"id":"BLK-102","name":"USFD Ultrasonic Rail Flaw Scan","start":9.0,"end":11.5,"type":"pway","dept":"P-WAY (ENGG)","km":"KM 84.10 – 92.50","privateNo":"PN-741982-AGC","tsr":"Trolley on track (Block protection)","details":"Mandatory rail ultrasonic flaw test as per IRPWM Para 808. Trolley protection with detonator signals."},
      {"id":"TRN-22436","name":"22436 Vande Bharat Express","start":11.8,"end":13.9,"type":"passenger","dept":"PASSENGER","km":"Through Transit (NDLS-BSB)","tsr":"Normal 130 km/h","details":"Semi-high speed EMU express. Punctuality monitor weight 1.0."},
      {"id":"FRT-BOXN","name":"BOXN 58W Coal Freight Rake","start":14.5,"end":17.0,"type":"freight","dept":"FREIGHT","km":"Okhla – Mathura Goods","tsr":"75 km/h Loaded","details":"Power house priority coal rake to Dadri Thermal Plant. Slot aligned via data.gov.in predictive goods schedule."},
      {"id":"TRN-12302","name":"12302 Howrah Rajdhani","start":17.5,"end":19.8,"type":"passenger","dept":"PASSENGER","km":"NDLS Outbound","tsr":"Normal 130 km/h","details":"Superfast Rajdhani Express with green wave signal precedence."},
      {"id":"BLK-103","name":"Deep Ballast Cleaning (BCM #14)","start":20.5,"end":23.5,"type":"pway","dept":"P-WAY (ENGG)","km":"KM 145.00 – 148.00","privateNo":"PN-912834-MTJ","tsr":"45 km/h for 48 hrs","details":"Mechanized ballast cleaning machine block with automated tamping trail."}
    ]
  },
  {
    "id": "DN_MAIN", "name": "DOWN Main Line",
    "code": "AGC ➔ NDLS (KM 198.50 – 00.00)", "speed": "160 km/h (Group A)",
    "blocks": [
      {"id":"BLK-201","name":"Rail Renewal B-44 (120m Long Welded Rail)","start":1.0,"end":4.2,"type":"pway","dept":"P-WAY (ENGG)","km":"KM 62.00 – 63.50","privateNo":"PN-632019-DLI","tsr":"20 km/h Dead Stop & Proceed","details":"Laying of 60kg 90UTS flash butt welded rails to eliminate rail joints."},
      {"id":"FRT-BCNA","name":"BCNA 42W Foodgrain Special","start":5.0,"end":7.5,"type":"freight","dept":"FREIGHT","km":"Punjab Mandi to Agra","tsr":"75 km/h Normal","details":"FCI subsidized grain special freight train."},
      {"id":"TRN-12002","name":"12002 Bhopal Shatabdi Express","start":8.0,"end":10.3,"type":"passenger","dept":"PASSENGER","km":"Inbound to New Delhi","tsr":"Normal 150 km/h","details":"High-speed executive corridor slot."},
      {"id":"BLK-202","name":"OHE 25kV Wire Stagger & Dropper Tuning","start":11.0,"end":13.2,"type":"trd","dept":"TRD (OHE)","km":"KM 110.00 – 114.50","privateNo":"PN-394821-PAL","tsr":"OHE Isolated (De-energized 25kV)","details":"ACTM Vol II Para 2063 compliance. Tower wagon possession with earth pole discharge."},
      {"id":"TRN-12952","name":"12952 Mumbai Tejas Rajdhani","start":14.0,"end":16.2,"type":"passenger","dept":"PASSENGER","km":"MTJ-NZM Section","tsr":"Normal 130 km/h","details":"Smart coach premium express service."},
      {"id":"FRT-CONCOR","name":"CONCOR Container Rake (90 TEU)","start":16.8,"end":19.5,"type":"freight","dept":"FREIGHT","km":"Tughlakabad ICD to Pipavav","tsr":"100 km/h High Axle Load","details":"Double stack container rake slot."},
      {"id":"TRN-12280","name":"12280 Taj Express","start":20.0,"end":22.5,"type":"passenger","dept":"PASSENGER","km":"VGLB to NDLS","tsr":"Normal 110 km/h","details":"Intercity daily express."}
    ]
  },
  {
    "id": "GOODS_LOOP", "name": "Third / Goods Loop Line",
    "code": "Faridabad – Mathura Loop (KM 30 – 140)", "speed": "75 km/h Loop",
    "blocks": [
      {"id":"BLK-301","name":"Track Circuit Glued Joint Renewal","start":2.0,"end":5.5,"type":"snt","dept":"S&T (SIGNALLING)","km":"KM 52.10","privateNo":"PN-558291-FDB","tsr":"Disconnection Memo Served","details":"Insulated joint overhaul to prevent track circuit false occupied alarms."},
      {"id":"FRT-EMPTY","name":"Empty BOXN Rake to Singrauli Coalfields","start":6.5,"end":10.0,"type":"freight","dept":"FREIGHT","km":"Loop Staging Track","tsr":"60 km/h","details":"Empty return movement bypassing passenger express paths."},
      {"id":"BLK-302","name":"Point Machine 112-B Rodding Overhaul","start":11.5,"end":14.5,"type":"snt","dept":"S&T (SIGNALLING)","km":"Palwal Yard KM 60","privateNo":"PN-104928-PWL","tsr":"Caution 15 km/h over points","details":"Routine S&T interlocking maintenance."},
      {"id":"FRT-CEMENT","name":"BCCN Bulk Cement Wagon Rake","start":15.5,"end":18.5,"type":"freight","dept":"FREIGHT","km":"Wadi to Shakurbasti","tsr":"65 km/h","details":"Covered bulk commodity transport."},
      {"id":"BLK-303","name":"Yard Siding Turnout Tamping","start":19.5,"end":23.0,"type":"pway","dept":"P-WAY (ENGG)","km":"Mathura Jn Yard Siding 4","privateNo":"PN-789012-MTJ","tsr":"Yard speed 15 km/h","details":"Unomatic tamping for turnout geometry correction."}
    ]
  }
]

TACTICAL = [
  {"day":"Monday (10-Sep)","code":"MON-DLI-01","section":"NDLS – AGC (KM 142.0 – 146.0)","track":"UP Main Line","type":"bundle","dept":"MULTI (P-Way + S&T + TRD)","title":"Deep Ballast Cleaning (BCM #14) + Point 104 Overhaul + OHE 25kV Wash","window":"00:30 – 04:00 (3.5h)","saved":"3.2 hrs saved","status":"APPROVED & LOCKED","tsr":"45 km/h Caution Order","pn":"PN-884102-DLI"},
  {"day":"Tuesday (11-Sep)","code":"TUE-DLI-02","section":"NDLS – AGC (KM 88.0 – 95.0)","track":"DOWN Main Line","type":"pway","dept":"P-WAY + USFD","title":"CSM-92 High-Speed Tamping + Ultrasonic Rail Flaw Scan (Para 808)","window":"01:00 – 05:00 (4.0h)","saved":"2.8 hrs saved","status":"CONFIRMED","tsr":"30 km/h Caution Order","pn":"PN-741982-AGC"},
  {"day":"Wednesday (12-Sep)","code":"WED-DLI-03","section":"Palwal Yard (KM 60.0 – 62.0)","track":"Goods Loop Track","type":"snt","dept":"S&T (INTERLOCKING)","title":"Turnout Renewal Point 112-B + Track Circuit Glued Joint Renewal","window":"10:30 – 13:30 (3.0h)","saved":"1.9 hrs saved","status":"SCHEDULED","tsr":"15 km/h over Turnouts","pn":"PN-558291-FDB"},
  {"day":"Thursday (13-Sep)","code":"THU-DLI-04","section":"Mathura Jn (KM 110.0 – 114.5)","track":"UP Main Line","type":"trd","dept":"TRD (OHE 25kV)","title":"OHE Catenary Wire Dropper & Stagger Tuning (ACTM Vol II Para 2063)","window":"02:00 – 05:30 (3.5h)","saved":"2.5 hrs saved","status":"SCHEDULED","tsr":"25kV Power Block De-energized","pn":"PN-394821-PAL"},
  {"day":"Friday (14-Sep)","code":"FRI-DLI-05","section":"Faridabad – Palwal (KM 35.0 – 48.0)","track":"3rd & 4th Line","type":"bundle","dept":"MULTI (P-Way + S&T)","title":"Continuous Rail Milling (RGM) + Axle Counter Calibration","window":"00:45 – 05:00 (4.25h)","saved":"3.6 hrs saved","status":"COA INTEGRATED","tsr":"50 km/h Caution Order","pn":"PN-912834-MTJ"},
  {"day":"Saturday (15-Sep)","code":"SAT-DLI-06","section":"Kosi Kalan – Chhata (KM 98.0 – 106.0)","track":"DOWN Main Line","type":"pway","dept":"P-WAY (ENGG)","title":"Long Welded Rail (LWR) Destressing & Flash Butt Weld Renewal","window":"01:15 – 04:45 (3.5h)","saved":"2.2 hrs saved","status":"LOCKED","tsr":"20 km/h Dead Stop & Proceed","pn":"PN-632019-DLI"},
  {"day":"Sunday (16-Sep)","code":"SUN-DLI-07","section":"Mathura Junction Yard","track":"All Yard Lines & Loops","type":"bundle","dept":"MULTI-DEPARTMENT MEGA BLOCK","title":"Comprehensive Yard Mega Possession: Unomatic Tamping + Signalling Interlock Cut-over","window":"00:00 – 05:00 (5.0h)","saved":"4.8 hrs saved","status":"DIVISION SANCTIONED","tsr":"Yard Block & Caution Orders","pn":"PN-789012-MTJ"}
]

STRATEGIC = [
  {"week":"Week 1 (Sep 10 – 16)","title":"Northern Division Track Renewal & Bridge Span Replacement","highlight":"Bridge #18 Girder Replacement (KM 60 Palwal) • 6-Hour Single-Line Working (SLW)","impact":"Corridor Capacity: 91.2% | Zero Freight Rakes Cancelled (Diverted via Goods Loop)","blocksCount":"28 Tactical Blocks","savings":"22.4 Track-Hours Saved","items":["Palwal Bridge #18 Superstructure Girder Launching (P-Way Bridge Gang)","BCM Ballast Cleaning Machine deployment KM 142–148 (High-Density Corridor)","OHE 25kV Feeder Wire Modernization at Okhla Traction Substation"]},
  {"week":"Week 2 (Sep 17 – 23)","title":"Continuous Heavy Track Renewal (PQRS 18km Stretch)","highlight":"Mechanized Track Relay System (PQRS) replacing aged 52kg with 60kg 90UTS Rails","impact":"Corridor Capacity: 93.8% | Speed Potential Upgraded to 160 km/h Mission Raftaar","blocksCount":"34 Tactical Blocks","savings":"26.8 Track-Hours Saved","items":["PQRS Rake in Section KM 72 to KM 90 (Down Main Line)","Electronic Interlocking (EI) Software Verification at Kosi Kalan","USFD High-Sensitivity Rail Testing across 120 Route Kilometers"]},
  {"week":"Week 3 (Sep 24 – 30)","title":"Traction Distribution Major Substation Overhaul","highlight":"132/25kV Grid Substation Transformer Maintenance in Coordination with NTPC Power Grid","impact":"Corridor Capacity: 95.1% | Electric Haulage Protected via Parallel Feeder Feed","blocksCount":"26 Tactical Blocks","savings":"19.5 Track-Hours Saved","items":["Kosi Kalan Traction Substation Overhaul & Circuit Breaker Testing","Automatic Signalling System Audio Frequency Track Circuits (AFTC) Renewal","TSR Speed Restriction Clearing Drive on 4 Curves"]},
  {"week":"Week 4 (Oct 01 – 07)","title":"Pre-Monsoon Track Drainage & Culvert Fortification","highlight":"Waterway Desilting & Geosynthetic Formation Rehabilitation on Low-Lying Embankments","impact":"Corridor Capacity: 96.4% | Flood Resilience Guaranteed under IMD High-Rainfall Forecast","blocksCount":"31 Tactical Blocks","savings":"24.2 Track-Hours Saved","items":["Mechanized Drain Cleaning along KM 28 to KM 55 (Yamuna Basin Edge)","Point Machine Heating Element & Weather Sealing Installation","Special Freight Path Pre-booking for Post-Monsoon Agricultural Export"]}
]

DEFECTS = [
  {"id":"TMS-9402","dept":"TMS (P-Way)","deptClass":"pway","location":"NDLS–AGC KM 127.40 – 128.80","system":"Track Management System","description":"Track Geometry Index (TGI) dropped to 52. Urgent mechanised tamping required.","metric":"TGI: 52 (Crit: <55)","duration":"3.0 Hours","priority":94,"regulation":"IRPWM Para 808"},
  {"id":"SMMS-3184","dept":"SMMS (S&T)","deptClass":"snt","location":"NDLS–AGC KM 128.10 (Palwal Outer)","system":"Signal Maint. Mgmt System","description":"Electric Point Machine 104-A ground rodding & lock detector wear inspection.","metric":"Overdue: 14 Days","duration":"2.0 Hours","priority":88,"regulation":"IRSEM Section 3"},
  {"id":"TDMS-7102","dept":"TDMS (TRD)","deptClass":"trd","location":"NDLS–AGC KM 126.50 – 129.50","system":"Traction Distribution System","description":"25kV Catenary contact wire height & stagger laser measurement + insulator cleaning.","metric":"Stagger: 240mm (Max: 200mm)","duration":"2.5 Hours","priority":82,"regulation":"ACTM Vol II Para 2063"},
  {"id":"TMS-9415","dept":"TMS (P-Way)","deptClass":"pway","location":"GZB–ALJN KM 64.20 – 68.00","system":"Track Management System","description":"USFD Ultrasonic rail testing detected IMR (Immediate Rail Replacement) flaw.","metric":"USFD Flaw: IMR Grade","duration":"2.5 Hours","priority":96,"regulation":"USFD Manual 2022"},
  {"id":"SMMS-3209","dept":"SMMS (S&T)","deptClass":"snt","location":"CNB–LKO KM 38.50","system":"Signal Maint. Mgmt System","description":"Axle Counter track sensor replacement and multi-core signalling cable meggering.","metric":"Axle Count Drift: 4%","duration":"1.5 Hours","priority":75,"regulation":"SEM Para 14.3"}
]

BIDS = [
  {"id":"BID-ENG-101","dept":"Engineering (P-Way)","deptClass":"pway","section":"KM 127.40 – 128.80 (UP Main)","activity":"CSM-92 Mechanised Track Tamping","requestedHours":3.0,"urgency":"Critical (TGI 52)","status":"BUNDLED IN SHADOW BLOCK"},
  {"id":"BID-SNT-102","dept":"Signal & Telecom (S&T)","deptClass":"snt","section":"KM 128.10 (Palwal Outer)","activity":"Point Machine 104-A Overhaul & Testing","requestedHours":2.0,"urgency":"High (Overdue 14 Days)","status":"BUNDLED IN SHADOW BLOCK"},
  {"id":"BID-TRD-103","dept":"Electrical (TRD / OHE)","deptClass":"trd","section":"KM 126.50 – 129.50","activity":"25kV Catenary Stagger Alignment & Wash","requestedHours":2.5,"urgency":"Medium (Stagger 240mm)","status":"BUNDLED IN SHADOW BLOCK"},
  {"id":"BID-OPT-104","dept":"Operating (Traffic)","deptClass":"pway","section":"KM 127.00 – 128.50","activity":"Turnout Diamond Clearance & Lubrication","requestedHours":1.5,"urgency":"Routine Monthly","status":"BUNDLED IN SHADOW BLOCK"}
]

SMS_THREAD = [
  {"sender":"field","text":"BLOCK REQ | SEC:NDL-GZB | KM:127-128 | DEPT:ENGG | TYPE:TRACK_TAMP | DUR:3HR","time":"00:27 IST"},
  {"sender":"system","text":"SAHAYAK RAIL DLI-CONTROL: BLOCK APPROVED. Window: 00:30-04:00 (3.5h Bundled with S&T Point 104). PRIVATE NUMBER: PN-884102-DLI. Caution Order 30 km/h imposed. Reply CONFIRM to occupy track.","time":"00:28 IST"},
  {"sender":"field","text":"CONFIRM | PN:884102-DLI | PWI_SHARMA | TRACK OCCUPIED","time":"00:31 IST"}
]

INITIAL_PARSED = {
  "id": 1,
  "section": "NDLS – GZB (KM 127.40 – 128.80)",
  "department": "Engineering (P-Way Gang #4)",
  "activity": "Mechanised Track Tamping (CSM-92)",
  "requestedDuration": "3.0 Hours",
  "privateNumber": "PN-884102-DLI",
  "status": "PARSED & APPROVED VIA CP-SAT",
  "timestamp": "10-Sep-2026 00:28:15 IST"
}

FREIGHT_RAKES = [
  {"id":"RAKE-BOXN-4892","type":"BOXN (58 Wagons)","commodity":"Thermal Coal (Power House)","origin":"Korba SECL Coalfields","destination":"Dadri NTPC Power Station","loco":"WAG-9 Twin (Electric 12,000 HP)","weight":"4,850 Gross Tonnes","status":"In Transit • On Schedule","corridorSlot":"Passing Palwal at 01:15 AM","priority":"Tier 1 (Power Plant Coal Stock: 3.2 Days)","conflictRisk":"Zero (Path cleared ahead of 12049 Gatimaan)"},
  {"id":"RAKE-BCNA-1102","type":"BCNA (42 Wagons)","commodity":"Foodgrains (Wheat / Rice)","origin":"Ludhiana Mandi (Punjab)","destination":"Varanasi FCI Buffer Godown","loco":"WAG-7 (Electric 5,000 HP)","weight":"3,200 Gross Tonnes","status":"Held at Tuglakabad Loop","corridorSlot":"Rescheduled to 04:45 AM","priority":"Tier 2 (Food Security Priority)","conflictRisk":"Adjusted by CP-SAT around Tamping Block"},
  {"id":"RAKE-BTPN-7841","type":"BTPN (50 Tank Wagons)","commodity":"Petroleum Products (Diesel/MS)","origin":"IOCL Mathura Refinery","destination":"Shakurbasti Oil Depot (Delhi)","loco":"WAG-9 (Electric 6,000 HP)","weight":"3,900 Gross Tonnes","status":"Loading Complete","corridorSlot":"Departure 07:15 AM","priority":"Tier 1 (Hazardous Inflammable Protocol)","conflictRisk":"Zero (Post-maintenance green window)"},
  {"id":"RAKE-CONCOR-9032","type":"BLCA/B (90 TEU Double Stack)","commodity":"Export-Import Container Cargo","origin":"ICD Tughlakabad","destination":"Pipavav Port (Gujarat)","loco":"WAG-9D (High Axle Load)","weight":"3,600 Gross Tonnes","status":"Transit Corridor Reserved","corridorSlot":"Departure 16:30 PM","priority":"Tier 2 (Port Vessel Cutoff Compliance)","conflictRisk":"Aligned with Western DFC Feeder Line"}
]

CALM_WINDOWS = [
  {"section":"Palwal – Kosi Kalan (KM 60 – 100)","time":"01:30 AM – 04:45 AM (3h 15m)","confidence":"98% Calm Window","reason":"No scheduled thermal coal rakes or express passenger trains.","recommendation":"Optimal for BCM Deep Ballast Screening or CSM Tamping"},
  {"section":"Faridabad – Ballabgarh Loop (KM 28 – 38)","time":"12:00 PM – 02:15 PM (2h 15m)","confidence":"92% Calm Window","reason":"Post-morning suburban peak gap prior to CONCOR freight dispatch.","recommendation":"Ideal for S&T Point Machine Overhaul & Track Circuit Check"},
  {"section":"Mathura Junction Yard – Siding 2","time":"21:00 PM – 23:30 PM (2h 30m)","confidence":"95% Calm Window","reason":"Yard shunting transition window between incoming rakes.","recommendation":"Suitable for OHE 25kV Insulator Cleaning & Dropper Tuning"}
]
VULNERABLE_SECTIONS = [
  {"id":"SEC-W1","name":"Yamuna River Bridge No. 142 (KM 142.20)","corridor":"NDLS – AGC Mainline","hazard":"River Flood Level Ingress","telemetry":"Water Level: 204.85m (Warning: 205.33m)","action":"Night ballast cleaning suspended; visual pier scour watch initiated.","status":"YELLOW PRECAUTION","rescheduled":True},
  {"id":"SEC-W2","name":"Vindhya Ghat Cutting (KM 312 – 318)","corridor":"JHS – GWL Grand Trunk","hazard":"Landslide & Boulder Fall Threat","telemetry":"Soil Moisture Saturation: 88% (High)","action":"Heavy mechanical track tamping postponed. Rockfall sensor patrol deployed.","status":"ORANGE ALERT","rescheduled":True},
  {"id":"SEC-W3","name":"Kanpur Ganga Bridge Approach (KM 74.00)","corridor":"CNB – LKO Corridor","hazard":"Track Circuit Waterlogging","telemetry":"Precipitation: 42 mm/hr Intense Rain","action":"Prioritized S&T epoxy cable jointing & drainage clearing block.","status":"ACTIVE MITIGATION","rescheduled":False},
  {"id":"SEC-W4","name":"Mathura High-Speed Tangent (KM 110 – 130)","corridor":"NDLS – MTJ High Speed","hazard":"Summer Rail Buckling / Thermal Stress","telemetry":"Rail Temperature: 48.5°C (Threshold: 55°C)","action":"De-stressing parameter logged. TSR 120 km/h during peak afternoon heat.","status":"THERMAL WATCH","rescheduled":False}
]

XAI_DECISIONS = [
  {
    "block_id": "BLK-101",
    "title": "Shadow Block #104 (Tamping + Point M/C + OHE Catenary)",
    "location": "NDLS–AGC KM 127.40 – 129.20 (UP Main)",
    "timeSlot": "00:30 – 04:00 AM (3.5 Hours)",
    "confidence": 96,
    "reasoning": "Multi-objective CP-SAT solver identified an optimal overlap between TMS track defect (TGI 52) and SMMS point machine wear at Palwal outer. Bundling averted 4.0 hours of separate closures.",
    "shapFactors": [
      {"name":"TGI Track Defect Urgency","pct":38,"val":"Score 52 (<55 threshold)","desc":"IRPWM Para 808 mandates tamping within 72 hrs."},
      {"name":"Corridor Traffic Gap Window","pct":26,"val":"Night Low Density","desc":"Fits between last express and morning Gatimaan."},
      {"name":"OHE 25kV Safety Interlock","pct":21,"val":"Single Power Block","desc":"ACTM Vol II Para 2063: power cut applied once."},
      {"name":"Machine & Crew Proximity","pct":15,"val":"Palwal Yard Siding","desc":"CSM-92 machine stationed 2.4 km away."}
    ],
    "regulations": [
      {"manual":"IRPWM Para 808","rule":"Ultrasonic flaw & track geometry index maintenance frequencies on Group A high-density lines."},
      {"manual":"ACTM Vol II Para 2063","rule":"Permit-to-work and mandatory earthing procedures for 25kV traction equipment."},
      {"manual":"IRSEM Para 14.3","rule":"Station Master disconnection memo requirement before point machine rodding overhaul."}
    ]
  },
  {
    "block_id": "BLK-102",
    "title": "USFD Ultrasonic Rail Flaw Testing (Trolley)",
    "location": "NDLS–AGC KM 84.10 – 92.50",
    "timeSlot": "09:00 – 11:30 AM (2.5 Hours)",
    "confidence": 93,
    "reasoning": "Scheduled in daytime due to visual optical requirements for rail defect categorization. Placed in headway gap between Gatimaan and Vande Bharat Express.",
    "shapFactors": [
      {"name":"Daylight Visibility Factor","pct":42,"val":"Optical USFD requirement","desc":"Manual flaw detection requires adequate illumination."},
      {"name":"Express Train Headway Gap","pct":32,"val":"140-Minute Window","desc":"Safe buffer following Train 12049 clearance."},
      {"name":"Cumulative GMT Load Stress","pct":26,"val":"42 GMT Carried","desc":"Approaching testing milestone on continuous welded rail."}
    ],
    "regulations": [
      {"manual":"USFD Manual Para 4.2","rule":"Testing interval specifications for 60kg 90UTS rails on high-density freight trunks."}
    ]
  }
]

AUDIT_LEDGER = [
  {"pn":"PN-884102-DLI","blockId":"BLK-101","section":"NDLS–AGC (KM 127–129)","dept":"MULTI (P-Way + S&T + TRD)","supervisor":"SSE/P-Way R. K. Sharma","controller":"Chief Controller A. K. Verma","grantedAt":"10-Sep-2026 00:28:15","clearedAt":"10-Sep-2026 03:52:10","status":"VERIFIED & AUDITED"},
  {"pn":"PN-741982-AGC","blockId":"BLK-102","section":"NDLS–AGC (KM 84–92)","dept":"P-WAY (USFD Scan)","supervisor":"JE/USFD M. Patel","controller":"Dy. Controller S. Sengupta","grantedAt":"09-Sep-2026 08:55:00","clearedAt":"09-Sep-2026 11:28:40","status":"VERIFIED & AUDITED"},
  {"pn":"PN-632019-DLI","blockId":"BLK-201","section":"AGC–NDLS (KM 62–64)","dept":"P-WAY (Rail Renewal)","supervisor":"SSE/Works T. N. Rao","controller":"Chief Controller A. K. Verma","grantedAt":"09-Sep-2026 00:52:30","clearedAt":"09-Sep-2026 04:10:00","status":"VERIFIED & AUDITED"},
  {"pn":"PN-394821-PAL","blockId":"BLK-202","section":"AGC–NDLS (KM 110–114)","dept":"TRD (OHE Stagger Check)","supervisor":"SSE/TRD K. Deshmukh","controller":"Traction Controller V. Joshi","grantedAt":"08-Sep-2026 10:50:00","clearedAt":"08-Sep-2026 13:05:22","status":"VERIFIED & AUDITED"}
]

def seed():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with SessionLocal() as s:
        for c in CORRIDORS:
            s.add(Corridor(**c))
        for t in TACTICAL:
            s.add(TacticalDay(**t))
        for w in STRATEGIC:
            s.add(StrategicWeek(**w))
        s.add(SolverStatus(id=1, time="1.18s", conflicts=0,
                           savedHours="4.5 hrs", status="OPTIMAL (CP-SAT v9.8)",
                           emergency_active=False))
        for d in DEFECTS:
            s.add(Defect(**d))
        for b in BIDS:
            s.add(Bid(**b))
        for m in SMS_THREAD:
            s.add(SmsMessage(**m))
        for r in FREIGHT_RAKES:
            s.add(FreightRake(**r))
        for c in CALM_WINDOWS:
            s.add(CalmWindow(**c))
        for v in VULNERABLE_SECTIONS:
            s.add(VulnerableSection(**v))
        s.add(WeatherState(id=1, monsoon_alert_active=False))
        for x in XAI_DECISIONS:
            s.add(XaiDecision(**x))
        for a in AUDIT_LEDGER:
            s.add(AuditLedgerEntry(**a))

        s.add(ParsedBlock(**INITIAL_PARSED))
        s.commit()
    print("✅ Seeded.")


if __name__ == "__main__":
    seed()