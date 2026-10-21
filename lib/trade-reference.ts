// Trade reference sheet for Tradesman Jarvis.
//
// This is a condensed, plain-language summary compiled to keep answers current.
// It is NOT the official code text. Model codes are amended locally, so the
// adopted edition and local amendments always win.
//
// Review status: DRAFT, compiled 2026-10-20. Have a licensed pro in each trade
// review their section before relying on it.
//
// Editions assumed: 2023 NEC; 2024 IPC, IRC, IMC, IFGC; OSHA 29 CFR 1926 / 1910.

export const TRADE_REFERENCE = `
=== ELECTRICAL (2023 NEC) ===

GFCI — DWELLING UNITS (210.8(A))
Applies to 125 V through 250 V receptacles supplied by single-phase branch circuits rated 150 V or less to ground, in these locations:
- Bathrooms
- Garages and accessory buildings with floors at or below grade not intended as habitable rooms
- Outdoors
- Crawl spaces at or below grade
- Basements (finished or unfinished)
- Kitchens: ALL receptacles in the kitchen, not only the ones serving the countertop. (The "serving the countertop" limit was the 2017 rule and was removed in the 2020 edition.)
- Areas with a sink and permanent provisions for food prep, beverage prep, or cooking (wet bars, etc.)
- Within 6 ft of the top inside edge of any sink bowl
- Within 6 ft of the outside edge of a bathtub or shower stall
- Laundry areas
- Boathouses
- Indoor damp and wet locations
Outdoor outlets at dwellings (210.8(F)): GFCI required for outdoor outlets on single-phase circuits 150 V or less to ground and 50 A or less. HVAC equipment has had a limited, time-based exception, so check the current status locally.
Specific appliances (210.8(D)): dishwashers and certain other listed appliances need GFCI regardless of location.

AFCI — DWELLING UNITS (210.12)
All 120 V, single-phase, 15 A and 20 A branch circuits supplying outlets or devices in: kitchens, family rooms, dining rooms, living rooms, parlors, libraries, dens, bedrooms, sunrooms, recreation rooms, closets, hallways, laundry areas, and similar rooms or areas.
When a branch circuit in those areas is modified, replaced, or extended, AFCI protection must be added (also in 210.12), with a short-extension allowance of 6 ft or less with no added outlets or devices.

DWELLING BRANCH CIRCUITS (210.11(C))
- At least two 20 A small-appliance branch circuits for kitchen, pantry, breakfast and dining room receptacles
- At least one 20 A laundry branch circuit
- At least one 20 A circuit for bathroom receptacles (one circuit may serve several bathrooms' receptacles, or all outlets in one bathroom)

RECEPTACLE LAYOUT (210.52)
- General wall space: no point along the floor line more than 6 ft from a receptacle (so receptacles about every 12 ft). Any wall space 2 ft or wider counts.
- Kitchen countertop: no point along the wall line more than 24 in from a receptacle; any countertop space 12 in or wider needs one.
- Islands and peninsulas (2023 change): a receptacle is NOT required. If none is installed, provisions for a future receptacle are required. If one is installed, it must be on or above the counter no more than 20 in above it, or be a listed countertop/work-surface receptacle assembly. Receptacles mounted face-up in a countertop must be listed for that use.
- Bathrooms: at least one receptacle within 3 ft of the outside edge of each basin.
- Outdoors: at least one at the front and one at the back of a one-family dwelling, accessible at grade and no more than 6.5 ft above grade.
- Tamper-resistant receptacles are required in dwelling units (406.12).

CONDUCTOR SIZING
Small-conductor overcurrent limits (240.4(D)), unless a specific rule allows otherwise (motors, AC equipment, etc.):
- 14 AWG copper: 15 A max
- 12 AWG copper: 20 A max
- 10 AWG copper: 30 A max
- 12 AWG aluminum/copper-clad aluminum: 15 A max
- 10 AWG aluminum/copper-clad aluminum: 25 A max
Common ampacities from Table 310.16 (60 °C / 75 °C / 90 °C columns), copper:
- 8 AWG: 40 / 50 / 55
- 6 AWG: 55 / 65 / 75
- 4 AWG: 70 / 85 / 95
- 3 AWG: 85 / 100 / 115
- 2 AWG: 95 / 115 / 130
- 1 AWG: 110 / 130 / 145
- 1/0: 125 / 150 / 170
- 2/0: 145 / 175 / 195
- 3/0: 165 / 200 / 225
- 4/0: 195 / 230 / 260
Aluminum:
- 6 AWG: 40 / 50 / 55
- 4 AWG: 55 / 65 / 75
- 2 AWG: 75 / 90 / 100
- 1/0: 100 / 120 / 135
- 2/0: 115 / 135 / 150
- 3/0: 130 / 155 / 175
- 4/0: 150 / 180 / 205
Temperature limits: use the column matching the LOWEST-rated termination, conductor, or device. Equipment rated 100 A or less, or with 14–1 AWG conductors, generally uses the 60 °C column unless marked 75 °C (110.14(C)).
NM-B (Romex): the conductors are rated 90 °C, but ampacity is limited to the 60 °C column (334.80). The 90 °C rating may be used only for ampacity adjustment and correction.
Dwelling services and feeders (310.12): conductors may be sized at 83% of the service rating. Typical results: 200 A service = 2/0 copper or 4/0 aluminum; 100 A = 4 AWG copper or 2 AWG aluminum.
Voltage drop: not a mandatory NEC rule for branch circuits; informational notes recommend max 3% on a branch circuit and 5% total. Upsizing long runs (roughly over 100 ft at 120 V and 20 A) is good practice.

BOX FILL (314.16)
Volume per conductor: 14 AWG = 2.0 cu in; 12 AWG = 2.25; 10 AWG = 2.5; 8 AWG = 3.0; 6 AWG = 5.0.
Count:
- Each conductor that originates outside the box: 1 each
- All equipment grounding conductors together: 1, based on the largest
- Each device yoke (receptacle or switch): 2, based on the largest conductor connected to it
- Internal cable clamps (any number): 1, based on the largest conductor
- Fixture studs or hickeys: 1 each
- Pigtails and jumpers wholly inside the box: 0

WORKING SPACE (110.26)
In front of panels and equipment likely to need servicing while energized: at least 30 in wide (or the width of the equipment, if wider), 3 ft deep for 0–150 V to ground (Condition 1), and 6.5 ft headroom. The space must be kept clear; no storage.

GROUNDING AND BONDING
- Ground rods (250.53): at least 8 ft in contact with soil. A single rod must have 25 ohms or less resistance, or a second rod must be added at least 6 ft away.
- Grounding electrode conductor to rods: 6 AWG copper is the maximum required for that connection (250.66(A)).
- Neutral and ground bonded only at the service disconnect, never in subpanels; subpanel neutrals stay isolated.
- Metal water piping must be bonded; gas piping bonding per 250.104(B).

=== PLUMBING (2024 IPC; IRC P-chapters are similar) ===

DRAINAGE SLOPE (IPC 704.1)
- 2-1/2 in and smaller: 1/4 in per foot minimum
- 3 in to 6 in: 1/8 in per foot minimum
- 8 in and larger: 1/16 in per foot minimum

TRAP-TO-VENT DISTANCE (IPC Table 909.1)
- 1-1/4 in trap: 5 ft max (at 1/4 in/ft)
- 1-1/2 in trap: 6 ft max (1/4 in/ft)
- 2 in trap: 8 ft max (1/4 in/ft)
- 3 in trap: 12 ft max (1/8 in/ft)
- 4 in trap: 16 ft max (1/8 in/ft)
Trap arm fall (IPC 909.2): the total fall of the trap arm from the trap weir to the vent fitting must not exceed one pipe diameter, so the vent opening is never below the trap weir. (Example: a 1-1/2 in arm may drop no more than 1-1/2 in over its whole length.) This limits slope over long arms; it does not mean the vent must be physically close to the trap.

TRAPS
- Trap seal: 2 in minimum, 4 in maximum (larger allowed only where special conditions require it)
- Every fixture trapped; no S-traps, bell traps, drum traps (except approved uses), or traps relying on moving parts
- Common minimum trap sizes: lavatory 1-1/4 in; bathtub 1-1/2 in; kitchen sink 1-1/2 in; shower 2 in; clothes washer standpipe 2 in
- Clothes washer standpipe: 18 in minimum and 42 in maximum above the trap weir

VENTS
- Height above the roof: set by the local jurisdiction (the model IPC leaves it blank). 6 in and 12 in are common, so check local amendments.
- Roofs used for other purposes (decks, promenades): open vents at least 7 ft above the roof.
- Not within 10 ft horizontally of a door, openable window, or air intake unless at least 3 ft above the top of that opening.
- Cold climates (97.5% design temp 0 °F or lower): increase the terminal to 3 in minimum, starting inside the thermal envelope.

WATER SUPPLY AND HEATERS
- Max static pressure at fixtures: 80 psi. Install a pressure-reducing valve if higher.
- T&P relief discharge pipe: full size of the valve outlet, no valves or tees, slopes to drain by gravity, not trapped, ends no more than 6 in above the floor or waste receptor, no threads on the end, and visible.
- Thermal expansion control (expansion tank) required where a check valve, backflow preventer, or PRV creates a closed system.
- Cleanouts: at the base of stacks, at changes of direction over 45° (with allowances), and at max 100 ft intervals on horizontal drains.

=== HVAC AND FUEL GAS (2024 IMC / IFGC / IRC M-chapters) ===

- Size equipment by load calculation: Manual J (load), Manual S (equipment selection), Manual D (ducts). Avoid rule-of-thumb tonnage.
- Condensate: equipment in attics or above finished ceilings needs a secondary drain pan with a separate drain, or a float/overflow shutoff (IRC M1411.3). Condensate pipe at 1/8 in per foot minimum slope.
- Combustion air (IFGC 304) standard method: indoor air is adequate only if the space has at least 50 cu ft per 1,000 Btu/h of total appliance input; otherwise bring in outdoor air.
- Gas piping: size from IFGC tables using total load, longest run, and pressure. A sediment trap (drip leg) is required at the inlet of most gas appliances (IFGC 408.4).
- Clearances to combustibles: follow the appliance listing and installation instructions. These override general rules.
- Refrigerants: new residential split systems are transitioning from R-410A to A2L refrigerants (R-454B, R-32). A2Ls are mildly flammable. Use A2L-rated tools and recovery equipment and follow the manufacturer's leak-detection and charge-limit requirements. Check current EPA dates for which R-410A equipment may still be installed.
- Refrigerant handling requires EPA Section 608 certification.

=== CARPENTRY AND BUILDING (2024 IRC) ===

STAIRS (R311.7)
- Max riser height: 7-3/4 in. Min tread depth: 10 in.
- Variation between the largest and smallest riser or tread in a flight: 3/8 in max.
- Min headroom: 6 ft 8 in. Min clear width: 36 in.
- Handrail: 34–38 in above the tread nosings, required on at least one side for flights with 4 or more risers. Graspable, continuous for the full flight.

GUARDS (R312)
- Required where the walking surface is more than 30 in above the floor or grade within 36 in horizontally.
- Min height: 36 in (34 in along the sloped side of stairs when the guard is also the handrail).
- Openings: must not pass a 4 in sphere; 4-3/8 in on stair sides; 6 in for the triangle under stair rails.

EGRESS WINDOWS (R310) — sleeping rooms and basements
- Net clear opening: 5.7 sq ft min (5.0 sq ft at grade-floor or below-grade openings)
- Min clear height 24 in, min clear width 20 in
- Sill no more than 44 in above the floor
- Window wells: 9 sq ft min area and 36 in min projection; a ladder is required if deeper than 44 in

SMOKE AND CO ALARMS (R314, R315)
- Smoke alarms: in each sleeping room, outside each sleeping area, and on each story including basements; interconnected; hardwired with battery backup in new construction.
- CO alarms: outside each sleeping area where there is fuel-fired equipment or an attached garage.

FRAMING
- Joist, rafter, and header sizes: use the IRC span tables (R502, R802, R602.7) for the species, grade, spacing, and loads. Do not guess spans.
- Decks: ledger attachment and joist spans per IRC R507 or local deck guides. Never nail-only a ledger; flashing is required.

=== JOB SITE SAFETY (OSHA) ===

FALL PROTECTION — CONSTRUCTION (1926.501 / 1926.502)
- Required at 6 ft or more above a lower level (guardrails, safety nets, or personal fall arrest).
- Guardrails: top rail 42 in ±3 in, withstand 200 lb outward/downward; midrail about halfway.
- Scaffolds (1926.451(g)): fall protection over 10 ft. Top rail 38–45 in on scaffolds placed in service after Jan 1, 2000.
- Holes: covers must be secured, marked "HOLE" or "COVER", and support 2x the expected load.

LADDERS (1926.1053)
- Extension ladders: set at a 4:1 ratio (1 ft out for every 4 ft up) and extend 3 ft above the landing.
- Don't stand on the top cap or top step of a stepladder (1926.1053(b)(13)). Follow the ladder's labels for the highest standing level on extension ladders.

TRENCHING AND EXCAVATION (1926.651 / 1926.652)
- Protective system (sloping, shoring, or shielding) required at 5 ft deep or more, unless in stable rock. A competent person may require it shallower.
- Over 20 ft deep: the protective system must be designed by a registered professional engineer.
- Ladder or other egress within 25 ft of lateral travel in trenches 4 ft deep or more.
- Spoil piles and equipment kept at least 2 ft back from the edge.
- A competent person inspects daily and after rain or other changes.

ELECTRICAL ON SITE (1926.404, 1926.405)
- GFCI protection (or an assured equipment grounding conductor program) for all 120 V, 15 A and 20 A temporary receptacles used by employees.
- Inspect cords daily; remove damaged cords from service.

HOT WORK AND WELDING (1926.350–1926.354; 1910.252)
- Move combustibles at least 35 ft away or shield them. A fire watch is required where combustibles can't be moved, and it stays at least 30 minutes after the work ends (1910.252; NFPA 51B).
- Oxygen cylinders stored at least 20 ft from fuel-gas cylinders, or separated by a noncombustible barrier at least 5 ft high with a half-hour fire rating (1926.350(a)(10)).
- Cylinders upright, secured, and capped when not in use.
- Ventilation or respiratory protection for welding fumes, especially on galvanized, coated, or stainless metals.
- Eye protection: use filter lenses with the correct shade number for the process and amperage.

PPE AND HEALTH
- Silica (1926.1153): cutting or grinding concrete, masonry, or stone needs dust controls (water or vacuum) per Table 1. Dry cutting without controls is not allowed.
- Hearing protection when noise exceeds permissible exposure.
- Lockout/tagout: verify zero energy with a tester before working on circuits or equipment.
`
