"use client";

import { useState, useCallback } from "react";

type Bagel = {
  name: string;
  tagline: string;
  fillings: string;
};

type HistoryItem = {
  name: string;
  ai: boolean;
};

const bagels: Bagel[] = [
  // ── Original 30 ──────────────────────────────────────────────────────────
  {
    name: "THE EKKA",
    tagline: "Show week. School's out. Brisbane's in. Dagwood dog regret imminent.",
    fillings: "deep-fried hash brown, show-bag fairy floss cream cheese, pickled jalapeño, hot sauce, sesame bagel",
  },
  {
    name: "DAYLIGHT SAVING",
    tagline: "Queensland doesn't do it. Your Melbourne friends never forgive you.",
    fillings: "smoked salmon, cream cheese, capers, thinly sliced red onion, dill, sunflower rye bagel",
  },
  {
    name: "CROSS RIVER RAIL",
    tagline: "Coming soon. Has been for a decade. Still a bus replacement.",
    fillings: "pulled pork, smoky BBQ, shredded iceberg, pickled red onion, poppy seed bagel",
  },
  {
    name: "THE BRUCE",
    tagline: "Sunshine Coast long weekend. Three hours. Normally one.",
    fillings: "beef patty, caramelised onion, cheddar, road-rage sriracha, dill pickles, sesame bagel",
  },
  {
    name: "BIN CHICKEN",
    tagline: "He was already at your table when you got back from the counter.",
    fillings: "stracciatella, grilled zucchini, pickled cabbage, lemon & herb oil, everything bagel",
  },
  {
    name: "SCHOOLIES",
    tagline: "It's not just the Gold Coast anymore. It's everywhere now.",
    fillings: "crispy chicken, coleslaw, hot honey, sweet & sour pickles, sesame bagel",
  },
  {
    name: "RIVERFIRE",
    tagline: "Incredible fireworks. Terrible getting home. Went again this year.",
    fillings: "chorizo, roasted capsicum, smoked paprika aioli, rocket, everything bagel",
  },
  {
    name: "NEW FARM PARKING",
    tagline: "You drove past the same spot four times. Someone else got it.",
    fillings: "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
  {
    name: "VALLEY FRIDAY",
    tagline: "11pm. Someone's glitter is now your problem.",
    fillings: "scrambled egg, streaky bacon, hot sauce, hash brown, cream cheese, sesame bagel",
  },
  {
    name: "SOUTH BANK SUNDAY",
    tagline: "Free public beach. Eighty thousand of your closest strangers.",
    fillings: "coconut labneh, avocado, chilli flakes, cucumber, sumac, everything bagel",
  },
  {
    name: "TRANSLINK DELAY",
    tagline: "The app said three minutes. That was twenty-two minutes ago.",
    fillings: "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "2032",
    tagline: "There's a crane outside. There'll be a crane outside until 2037.",
    fillings: "grilled chicken, rocket, sundried tomato, provolone, garlic aioli, garlic bagel",
  },
  {
    name: "GABBA DEMO",
    tagline: "Demolishing a beloved stadium for the Olympics. Nobody asked.",
    fillings: "beef patty, grilled onion, cheddar, BBQ sauce, dill pickles, sesame bagel",
  },
  {
    name: "ALDI 8AM",
    tagline: "Middle aisle. Leaf blower. Kayak. Mystery meat. Go.",
    fillings: "hash brown, egg, cheese, mystery aioli, hot sauce, everything bagel",
  },
  {
    name: "WET SEASON",
    tagline: "November through April. Perpetually damp. Mould on the bathroom ceiling again.",
    fillings: "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "NOISY MINER",
    tagline: "Small bird. Big agenda. Has chosen you specifically.",
    fillings: "crispy tofu, avocado, pickles, sriracha, shredded kale, sesame bagel",
  },
  {
    name: "HOT STEERING WHEEL",
    tagline: "February, 3pm. The car's been in full sun. You have no gloves. You have no choice.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "HAIL WARNING",
    tagline: "BoM sent the alert. You left the car outside again.",
    fillings: "battered cauliflower, ranch, pickled jalapeño, iceberg, poppy seed bagel",
  },
  {
    name: "FLOOD WATCH",
    tagline: "Sandbag shortage. Woolworths out of bread. The creek is over.",
    fillings: "kimchi, hash brown, cream cheese, bacon jam, sesame bagel",
  },
  {
    name: "STORY BRIDGE PEAK",
    tagline: "One bridge. Three suburbs. Zero alternatives.",
    fillings: "slow-cooked beef, caramelised onion, swiss cheese, gherkins, grain mustard, poppy seed bagel",
  },
  {
    name: "IKEA LOGAN",
    tagline: "You came for a shelf. You left three hours later with a new life.",
    fillings: "Swedish meatball, lingonberry aioli, iceberg, pickled cucumber, sesame bagel",
  },
  {
    name: "CITYCAT CANCELLED",
    tagline: "Flooding. No river access. No replacement bus. Go around.",
    fillings: "hot smoked salmon, dill cream cheese, capers, red onion, sunflower rye bagel",
  },
  {
    name: "SCHOOL DROP-OFF",
    tagline: "There is a zone. Nobody understands the zone. The zone is chaos.",
    fillings: "avocado, spinach, tomato, haloumi, pesto, fried egg, everything bagel",
  },
  {
    name: "QUEEN ST BUSKER",
    tagline: "Untuned guitar. Eye contact. Nowhere to look.",
    fillings: "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, sesame bagel",
  },
  {
    name: "COUNCIL RATES",
    tagline: "Due February. Every February. More than last February.",
    fillings: "crispy bacon, egg, cheddar, hash brown, BBQ sauce, everything bagel",
  },
  {
    name: "WESTFIELD CARINDALE",
    tagline: "Christmas parking. Just Christmas parking.",
    fillings: "smoked turkey, cranberry aioli, swiss, rocket, grain mustard, poppy seed bagel",
  },
  {
    name: "POWERLINK WORKS",
    tagline: "Summer storm. Power out by 4pm. No air conditioning.",
    fillings: "grilled mushroom, vegan russian dressing, pickled cabbage, provolone, poppy seed bagel",
  },
  {
    name: "NO LEFT TURN",
    tagline: "You've been on this block for four circuits. The arrow is never green.",
    fillings: "beef patty, American cheese, pickles, mustard, special sauce, sesame bagel",
  },
  {
    name: "HERITAGE LISTING",
    tagline: "A developer wants to knock it down. There's a Facebook group about it.",
    fillings: "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "EXPO HANGOVER",
    tagline: "Two days in. One more to go. Your feet gave up this morning.",
    fillings: "pulled pork, slaw, pickles, hot sauce, aioli, sesame bagel",
  },

  // ── 100 New ──────────────────────────────────────────────────────────────
  {
    name: "SNAKE SEASON",
    tagline: "November. The garden hose incident. Completely your fault.",
    fillings: "grilled chorizo, roasted red pepper, garlic aioli, rocket, everything bagel",
  },
  {
    name: "PARKING INSPECTOR",
    tagline: "Six minutes over. Windscreen already done. You saw them walking away.",
    fillings: "smoked salmon, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "LONG WEEKEND PETROL",
    tagline: "It went up on Tuesday. You knew. You waited anyway.",
    fillings: "beef patty, caramelised onion, cheddar, sriracha, dill pickles, sesame bagel",
  },
  {
    name: "BODY CORP MEETING",
    tagline: "7pm. Ninety minutes. Nothing resolved. Same three complaints as March.",
    fillings: "grilled mushroom, pickled cabbage, vegan dressing, provolone, poppy seed bagel",
  },
  {
    name: "SEAGULL AMBUSH",
    tagline: "You had two chips left. Suddenly you had none.",
    fillings: "crispy chicken, coleslaw, hot honey, sweet pickles, sesame bagel",
  },
  {
    name: "BUNNINGS WEEKEND",
    tagline: "You came for one screw. You left with $180 of things you needed.",
    fillings: "slow-cooked beef, caramelised onion, BBQ sauce, pickles, poppy seed bagel",
  },
  {
    name: "STATE OF ORIGIN",
    tagline: "Brisbane during Origin. Unbearable whether they win or lose.",
    fillings: "beef patty, cheddar, caramelised onion, BBQ sauce, dill pickles, sesame bagel",
  },
  {
    name: "SPEED CAMERA LETTER",
    tagline: "Six weeks later. You forgot completely. Still $200.",
    fillings: "smoked turkey, cranberry aioli, swiss, rocket, grain mustard, poppy seed bagel",
  },
  {
    name: "TAILGATER",
    tagline: "M1 South. 110km/h. They want 130. They are making this clear.",
    fillings: "chorizo, roasted capsicum, smoked paprika aioli, cheddar, everything bagel",
  },
  {
    name: "TOOWOOMBA RANGE",
    tagline: "Uphill. Behind a truck. One lane. 40km of absolute patience.",
    fillings: "pulled pork, smoky BBQ, slaw, pickles, sesame bagel",
  },
  {
    name: "NORTH STRADDIE FERRY",
    tagline: "45 minutes each way. You forgot the esky. So did the boat.",
    fillings: "hot smoked salmon, dill cream cheese, capers, red onion, sunflower rye bagel",
  },
  {
    name: "TRADIES EARLY",
    tagline: "Quote said 8am. Concrete started at 6:48am. Your neighbour is furious.",
    fillings: "scrambled egg, streaky bacon, hot sauce, hash brown, everything bagel",
  },
  {
    name: "COLES SELF CHECKOUT",
    tagline: "Unexpected item in bagging area. You are the unexpected item.",
    fillings: "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, plain bagel",
  },
  {
    name: "INSURANCE RENEWAL",
    tagline: "Same product. 24% increase. No explanation. Just a letter.",
    fillings: "kimchi, hash brown, cream cheese, bacon jam, everything bagel",
  },
  {
    name: "BIKE LANE STANDOFF",
    tagline: "Car parked in it. Cyclist stopped. Argument now commencing.",
    fillings: "crispy tofu, avocado, pickles, sriracha, shredded kale, sesame bagel",
  },
  {
    name: "NBN TECH WINDOW",
    tagline: "8am to 5pm. They came at 4:56pm. Knocked once. Left a card.",
    fillings: "grilled chicken, rocket, sundried tomato, provolone, garlic aioli, garlic bagel",
  },
  {
    name: "MOULD SEASON",
    tagline: "June. North-facing bathroom. A month of pretending it's not there.",
    fillings: "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "CONSTRUCTION HOARDING",
    tagline: "Every footpath in Brisbane. For the foreseeable future.",
    fillings: "beef patty, grilled onion, cheddar, BBQ sauce, dill pickles, sesame bagel",
  },
  {
    name: "MEMBER PRICE",
    tagline: "You need to be a member to pay the regular price. Of course.",
    fillings: "hash brown, egg, cheese, aioli, hot sauce, sesame bagel",
  },
  {
    name: "SMOKE ALARM BATTERY",
    tagline: "3am. Chirping. Ten-foot ceiling. No ladder. Your fault somehow.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "COUNCIL TREE",
    tagline: "You can't touch it. It touches everything. It is heritage listed.",
    fillings: "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
  {
    name: "SUNCORP EXIT",
    tagline: "Every gate at once. One set of traffic lights. Nobody is moving.",
    fillings: "chorizo, caramelised onion, smoked paprika, cheddar, everything bagel",
  },
  {
    name: "LATE NIGHT CHEMIST",
    tagline: "Only one open. 38 minutes away. Closes in twelve minutes.",
    fillings: "scrambled egg, streaky bacon, cream cheese, hot sauce, sesame bagel",
  },
  {
    name: "NBN OUTAGE",
    tagline: "Teams call in four minutes. Router blinking. ISP: no outages in your area.",
    fillings: "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "CHRISTMAS TRAFFIC",
    tagline: "Gateway Motorway. Christmas Eve. Everyone is going to the same coast.",
    fillings: "slow-cooked beef, caramelised onion, swiss, gherkins, grain mustard, poppy seed bagel",
  },
  {
    name: "SURGE PRICING",
    tagline: "New Year's Eve. You knew it was coming. Still $84 to Paddington.",
    fillings: "crispy chicken, coleslaw, hot honey, sweet pickles, sesame bagel",
  },
  {
    name: "REAL ESTATE OPEN",
    tagline: "Sunday 10am. Forty groups through. Offer required by Tuesday. It went $80k over.",
    fillings: "avocado, spinach, tomato, haloumi, pesto, fried egg, everything bagel",
  },
  {
    name: "PUBLIC POOL PLASTER",
    tagline: "One plaster. Entire pool closed. Three hours of explanation.",
    fillings: "battered cauliflower, ranch, pickled jalapeño, iceberg, poppy seed bagel",
  },
  {
    name: "NIGHT PAVING",
    tagline: "Tuesday night. Your street. 11pm. Standard equipment.",
    fillings: "grilled mushroom, vegan dressing, pickled cabbage, provolone, poppy seed bagel",
  },
  {
    name: "TAMBORINE DAYTRIP",
    tagline: "One road in. One road out. Everyone had the same idea at the same time.",
    fillings: "pulled pork, slaw, pickles, hot sauce, aioli, sesame bagel",
  },
  {
    name: "WORK CHRISTMAS PARTY",
    tagline: "Held at the office. At 4pm. On a Thursday. Bring a plate.",
    fillings: "smoked turkey, cranberry aioli, swiss, rocket, grain mustard, poppy seed bagel",
  },
  {
    name: "QR CODE MENU",
    tagline: "No signal. They only have the QR code. The waiter shrugs.",
    fillings: "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, sesame bagel",
  },
  {
    name: "COMMUNITY FACEBOOK",
    tagline: "One noise complaint. 47 comments. Someone brought up 2019.",
    fillings: "beef patty, American cheese, pickles, mustard, special sauce, sesame bagel",
  },
  {
    name: "MOUNT COOT-THA",
    tagline: "Every tourist in Brisbane. One car park. No shade.",
    fillings: "stracciatella, grilled zucchini, pickled cabbage, lemon & herb oil, everything bagel",
  },
  {
    name: "WRONG BIN DAY",
    tagline: "Green lid. Wrong fortnight. Sitting at the kerb until further notice.",
    fillings: "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "AFTERNOON STORM",
    tagline: "3pm. No warning. Left the windows down. Again.",
    fillings: "spicy chorizo, roasted capsicum, smoked paprika aioli, rocket, everything bagel",
  },
  {
    name: "IPSWICH MOTORWAY",
    tagline: "It's always like this. Always has been. Always will be.",
    fillings: "slow-cooked beef, caramelised onion, cheddar, mustard, gherkins, poppy seed bagel",
  },
  {
    name: "OCTOBER HUMIDITY",
    tagline: "Not technically summer yet. Your body has a different opinion.",
    fillings: "coconut labneh, avocado, chilli flakes, cucumber, sumac, everything bagel",
  },
  {
    name: "WATER RESTRICTIONS",
    tagline: "Level 2. Pool half full. Garden: we'll see.",
    fillings: "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "THE SHARED SCOOTER",
    tagline: "Abandoned on the footpath. Blocking the ramp. Nobody's problem.",
    fillings: "crispy tofu, avocado, pickles, sriracha, shredded kale, sesame bagel",
  },
  {
    name: "SNAP LOCKDOWN",
    tagline: "One mystery case. 72 hours. You were at that venue on Thursday.",
    fillings: "kimchi, hash brown, cream cheese, bacon jam, everything bagel",
  },
  {
    name: "LONG TABLE DINNER",
    tagline: "Seated next to strangers. Mandatory conversation. No escape route.",
    fillings: "grilled chicken, rocket, sundried tomato, provolone, garlic bagel",
  },
  {
    name: "AIRCON WARS",
    tagline: "Office thermostat. No consensus. Someone brought a blanket.",
    fillings: "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "HALF TIME QUEUE",
    tagline: "Suncorp. Food line. Match resumes in three minutes.",
    fillings: "beef patty, grilled onion, cheddar, BBQ sauce, sesame bagel",
  },
  {
    name: "MONDAY CYCLISTS",
    tagline: "Coronation Drive. Lycra. Pack of fourteen. 28km/h.",
    fillings: "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
  {
    name: "APARTMENT WIFI",
    tagline: "The complex has shared internet. From 2011. Peak hour is optimistic.",
    fillings: "scrambled egg, streaky bacon, hot sauce, hash brown, cream cheese, sesame bagel",
  },
  {
    name: "PUBLIC HOLIDAY SURCHARGE",
    tagline: "15%. You knew before you went. You went anyway.",
    fillings: "crispy chicken, coleslaw, hot honey, pickles, sesame bagel",
  },
  {
    name: "TOLL NOTICE",
    tagline: "You didn't register the rental. Now it's $15, plus admin, plus another admin.",
    fillings: "slow-cooked beef, caramelised onion, swiss, gherkins, poppy seed bagel",
  },
  {
    name: "STRATA LEVY",
    tagline: "Surprise waterproofing issue. Due in 30 days. Not a small amount.",
    fillings: "grilled mushroom, pickled cabbage, vegan dressing, provolone, poppy seed bagel",
  },
  {
    name: "NEIGHBOUR'S ROOSTER",
    tagline: "4:30am. Every morning. Residential area. Not a farm.",
    fillings: "scrambled egg, streaky bacon, hash brown, aioli, everything bagel",
  },
  {
    name: "PETROL PRICE MONDAY",
    tagline: "It went up 18c. Tuesday it comes back down. You filled Monday.",
    fillings: "chorizo, roasted capsicum, smoked paprika aioli, cheddar, everything bagel",
  },
  {
    name: "TENERIFFE HILLS",
    tagline: "You live here. Every trip to the car is a commitment.",
    fillings: "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, sesame bagel",
  },
  {
    name: "SPRING HILL STAIRS",
    tagline: "There's no flat way to get anywhere. That's just the suburb.",
    fillings: "crispy tofu, avocado, pickles, sriracha, kale, sesame bagel",
  },
  {
    name: "EAGLE FARM RACE DAY",
    tagline: "The one day of the year. Traffic around it: significant.",
    fillings: "smoked turkey, cranberry aioli, swiss, rocket, mustard, poppy seed bagel",
  },
  {
    name: "ROAD WORKS NOTIFICATION",
    tagline: "11pm start. Residential street. Equipment: extremely loud.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "GAS BILL AUGUST",
    tagline: "You ran the reverse cycle all July. The bill lands in August.",
    fillings: "slow-cooked beef, caramelised onion, swiss, gherkins, grain mustard, poppy seed bagel",
  },
  {
    name: "BLUECARD RENEWAL",
    tagline: "Expiring next week. System is experiencing issues. The kids can wait.",
    fillings: "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "EARLY CHECK-IN DENIED",
    tagline: "10am. Hotel says 3pm. Bags go in a cupboard. You go nowhere.",
    fillings: "avocado, spinach, tomato, haloumi, pesto, fried egg, everything bagel",
  },
  {
    name: "GATEWAY MOTORWAY",
    tagline: "Both directions. Both always. No reason ever offered.",
    fillings: "beef patty, American cheese, pickles, mustard, special sauce, sesame bagel",
  },
  {
    name: "MATER HOSPITAL PARKING",
    tagline: "$9 for 15 minutes. They only validate for the gift shop.",
    fillings: "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "SATURDAY REGOS",
    tagline: "Car, boat, trailer. All due the same month. Every year.",
    fillings: "crispy bacon, egg, cheddar, hash brown, BBQ sauce, everything bagel",
  },
  {
    name: "BORDER CLOSURE",
    tagline: "NSW plate. Coolangatta. 2021. The tent. The form. The wait.",
    fillings: "pulled pork, smoky BBQ, slaw, pickles, sesame bagel",
  },
  {
    name: "CAXTON STREET ORIGIN",
    tagline: "Origin night. Shoes stick to the floor. The sound carries for blocks.",
    fillings: "beef patty, grilled onion, cheddar, BBQ sauce, hot sauce, sesame bagel",
  },
  {
    name: "FERRY WHARF WAIT",
    tagline: "Teneriffe. No shade. 28 degrees. App says on time.",
    fillings: "hot smoked salmon, dill cream cheese, capers, red onion, sunflower rye bagel",
  },
  {
    name: "SLAM POETRY NIGHT",
    tagline: "You didn't know it was slam poetry night. You found out together.",
    fillings: "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, sesame bagel",
  },
  {
    name: "FORTITUDE VALLEY STATION",
    tagline: "You are not sure which exit leads where. Nor is anyone else.",
    fillings: "scrambled egg, streaky bacon, cream cheese, hot sauce, sesame bagel",
  },
  {
    name: "GRASS FIRE ALERT",
    tagline: "December. Emergency alert. Better safe. You cannot leave. Just waiting.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "POSTIE INCIDENT",
    tagline: "Your cat ambushes the postie. Daily. The postie has made notes.",
    fillings: "crispy chicken, coleslaw, hot honey, pickles, sesame bagel",
  },
  {
    name: "SCHOOL SHOE SHOPPING",
    tagline: "January. One shop stocks the right brand. Queue since 8am.",
    fillings: "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "KOALA ZONE",
    tagline: "Slow down for 3km. You always slow down. You never see one.",
    fillings: "battered cauliflower, ranch, jalapeño, iceberg, poppy seed bagel",
  },
  {
    name: "LATE INVOICE",
    tagline: "Work completed October. Invoice arrived January. Payment terms: immediate.",
    fillings: "beef patty, caramelised onion, cheddar, BBQ sauce, sesame bagel",
  },
  {
    name: "END OF MANGO SEASON",
    tagline: "April. The last one. Stringy. Sad. Months until the next.",
    fillings: "coconut labneh, avocado, chilli flakes, cucumber, sumac, everything bagel",
  },
  {
    name: "REDCLIFFE PENINSULA",
    tagline: "You can see the city from here. You cannot easily get there.",
    fillings: "slow-cooked beef, caramelised onion, swiss, gherkins, mustard, poppy seed bagel",
  },
  {
    name: "BODY CORP INSPECTION",
    tagline: "They're coming sometime this month. Could be any day. You wait.",
    fillings: "grilled mushroom, pickled cabbage, vegan dressing, provolone, poppy seed bagel",
  },
  {
    name: "AUSTRALIA DAY DEBATE",
    tagline: "Every January. Online. Nobody changes their mind. Repeat.",
    fillings: "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "JANUARY GYM",
    tagline: "Your gym, first two weeks of January. Equipment: occupied. Parking: gone.",
    fillings: "crispy tofu, avocado, pickles, sriracha, kale, sesame bagel",
  },
  {
    name: "SMASHED AVO TAX",
    tagline: "The generation above will not let this go. You're still renting.",
    fillings: "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
  {
    name: "ATO LETTER",
    tagline: "Tax time. Same week as your rates notice. Coincidence, allegedly.",
    fillings: "slow-cooked beef, caramelised onion, swiss, gherkins, grain mustard, poppy seed bagel",
  },
  {
    name: "COFFEE MACHINE DOWN",
    tagline: "The café's machine is being serviced. Back tomorrow. You came for one thing.",
    fillings: "scrambled egg, streaky bacon, hash brown, cream cheese, hot sauce, sesame bagel",
  },
  {
    name: "NORTHSHORE DEVELOPMENT",
    tagline: "New suburb. New apartments. Old roads. New traffic.",
    fillings: "grilled chicken, rocket, sundried tomato, provolone, garlic aioli, garlic bagel",
  },
  {
    name: "LONG WEEKEND HARDWARE",
    tagline: "Every Bunnings in SEQ, simultaneously, Friday afternoon.",
    fillings: "slow-cooked beef, caramelised onion, cheddar, BBQ sauce, poppy seed bagel",
  },
  {
    name: "THE BRISBANE HEAT",
    tagline: "The cricket team. Also just: the heat.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "CHECKOUT CHARITY",
    tagline: "Prompted to donate at every checkout. Every store. Every time.",
    fillings: "kimchi, hash brown, cream cheese, bacon jam, sesame bagel",
  },
  {
    name: "STORM DRAIN",
    tagline: "20 minutes of rain. Ankle deep on the way to the car.",
    fillings: "battered cauliflower, ranch, jalapeño, iceberg, poppy seed bagel",
  },
  {
    name: "TRAM REPLACEMENT BUS",
    tagline: "The heritage tram is temporarily not running. Since 2022.",
    fillings: "grilled mushroom, pickled cabbage, vegan dressing, provolone, poppy seed bagel",
  },
  {
    name: "PACIFIC MOTORWAY",
    tagline: "It's like this every day. In both directions. No reason.",
    fillings: "beef patty, caramelised onion, cheddar, sriracha, dill pickles, sesame bagel",
  },
  {
    name: "POOL GATE CODE",
    tagline: "The code changed. The notice went to your old email. The pool is locked.",
    fillings: "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "SPEED ZONE 40",
    tagline: "School zone. 7:58am. You forgot it was a school day. Just those two seconds.",
    fillings: "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "POST OFFICE PARCEL",
    tagline: "Sorry we missed you. You were home. All day. You watched the van.",
    fillings: "crispy chicken, coleslaw, hot honey, pickles, sesame bagel",
  },
  {
    name: "ANNUAL LEAVE GUILT",
    tagline: "First day back. 300 emails. Nobody covered anything. Standard.",
    fillings: "scrambled egg, streaky bacon, hot sauce, hash brown, cream cheese, sesame bagel",
  },
  {
    name: "HOT WATER GONE",
    tagline: "Sunday night. Shower. Cold. Plumber available Wednesday.",
    fillings: "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "THE RESURFACING",
    tagline: "They redid the road. Then dug it up again for the water main.",
    fillings: "beef patty, grilled onion, cheddar, BBQ sauce, sesame bagel",
  },
  {
    name: "NOVEMBER FLIES",
    tagline: "One got in. Now there are more. The door was open for two seconds.",
    fillings: "crispy tofu, avocado, pickles, sriracha, kale, sesame bagel",
  },
  {
    name: "PHONE PLAN RENEWAL",
    tagline: "More data, same price, but your existing plan is somehow now worse.",
    fillings: "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "BODY CORP CAT",
    tagline: "Not permitted per the by-laws. Everyone has one. Nobody speaks of it.",
    fillings: "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
];

export default function BagelGeneratorClient() {
  const [index, setIndex] = useState(
    () => Math.floor(Math.random() * bagels.length)
  );
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [aiBagel, setAiBagel] = useState<Bagel | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentBagel = aiBagel ?? bagels[index];
  const isAI = aiBagel !== null;

  const next = useCallback(() => {
    const name = (aiBagel ?? bagels[index]).name;
    setHistory((prev) => [{ name, ai: !!aiBagel }, ...prev]);
    setAiBagel(null);
    setAiError(null);
    setIndex((prev) => {
      let n = Math.floor(Math.random() * bagels.length);
      while (n === prev && bagels.length > 1) n = Math.floor(Math.random() * bagels.length);
      return n;
    });
    setAnimKey((k) => k + 1);
  }, [index, aiBagel]);

  const generateAI = useCallback(async () => {
    const name = (aiBagel ?? bagels[index]).name;
    setHistory((prev) => [{ name, ai: !!aiBagel }, ...prev]);
    setAiBagel(null);
    setAiError(null);
    setAiLoading(true);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Request failed");
      setAiBagel(data as Bagel);
      setAnimKey((k) => k + 1);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Generation failed — try again.");
    } finally {
      setAiLoading(false);
    }
  }, [index, aiBagel]);

  const copyName = useCallback(() => {
    navigator.clipboard.writeText(currentBagel.name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [currentBagel]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-mono">
      {/* Header */}
      <header className="border-b border-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-sm uppercase tracking-widest">
            Unbearable Bagels
          </span>
          <span className="text-xs text-black/40 tracking-widest uppercase">
            — name generator
          </span>
        </div>
        <span className="text-xs text-black/30 uppercase tracking-widest">
          {bagels.length} names
        </span>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-black/40 mb-12">
            today&apos;s special
          </p>

          {/* Bagel card */}
          <div key={animKey} className="rise">
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-sm text-black/40">
                {isAI ? "AI" : `No. ${String(index + 1).padStart(2, "0")} / ${bagels.length}`}
              </p>
              {isAI && (
                <span className="text-xs border border-black px-2 py-0.5 uppercase tracking-widest">
                  AI generated
                </span>
              )}
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight mb-8">
              {currentBagel.name}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-black/70 mb-8 max-w-lg">
              {currentBagel.tagline}
            </p>

            <div className="border-t border-black/20 pt-6">
              <p className="text-xs uppercase tracking-widest text-black/40 mb-3">
                suggested filling
              </p>
              <p className="text-sm leading-relaxed text-black/60">
                {currentBagel.fillings}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-wrap gap-3">
            <button
              onClick={next}
              disabled={aiLoading}
              className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-40"
            >
              Next one
              <ArrowRightIcon />
            </button>

            <button
              onClick={generateAI}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 border border-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-40"
            >
              {aiLoading ? (
                <>
                  <SpinnerIcon />
                  Generating...
                </>
              ) : (
                <>
                  <SparkleIcon />
                  Generate with AI
                </>
              )}
            </button>

            <button
              onClick={copyName}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 border border-black/30 text-black/50 px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-colors disabled:opacity-40"
            >
              {copied ? (
                <><CheckIcon /> Copied</>
              ) : (
                <><CopyIcon /> Copy</>
              )}
            </button>
          </div>

          {aiError && (
            <p className="mt-4 text-sm text-black/50">{aiError}</p>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="mt-16 border-t border-black/20 pt-8">
              <p className="text-xs uppercase tracking-widest text-black/40 mb-6">
                previously generated
              </p>
              <ul className="space-y-3">
                {history.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex items-baseline gap-3"
                  >
                    <span className="text-sm font-bold text-black/40 tracking-tight">
                      {item.name}
                    </span>
                    {item.ai && (
                      <span className="text-xs text-black/25 uppercase tracking-widest">
                        ai
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 py-5">
        <p className="text-xs text-black/30 text-center tracking-wide">
          unofficially inspired by{" "}
          <a
            href="https://www.unbearablebagels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-black transition-colors"
          >
            unbearablebagels.com
          </a>
          . all names are equally unbearable.
        </p>
      </footer>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
