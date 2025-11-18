# Enhanced disease information with detailed descriptions and recommendations

DISEASE_INFO = {
    "Healthy": {
        "name": "Healthy Leaf",
        "severity": "None",
        "description": """
The leaf shows no signs of disease or pest damage. It exhibits normal coloration, 
structure, and vitality. Healthy mango leaves are typically dark green, smooth, 
and free from spots, lesions, or discoloration. The leaf tissue appears intact 
with no signs of wilting, curling, or abnormal growth patterns.
        """.strip(),
        "symptoms": [
            "Vibrant green coloration",
            "Smooth leaf surface",
            "No spots or lesions",
            "Normal leaf structure",
            "No signs of pest damage"
        ],
        "causes": "No disease present - optimal growing conditions maintained",
        "treatment": """
Continue current maintenance practices to keep the tree healthy:

1. **Watering**: Maintain consistent moisture levels, avoiding both drought stress and waterlogging
2. **Fertilization**: Apply balanced NPK fertilizer (10-10-10) every 2-3 months during growing season
3. **Pruning**: Remove dead or crossing branches to improve air circulation
4. **Monitoring**: Regular inspection for early disease detection
5. **Mulching**: Apply organic mulch around the base to retain moisture and suppress weeds
        """.strip(),
        "prevention": """
- Maintain proper spacing between trees for good air circulation
- Ensure adequate drainage to prevent root rot
- Apply preventive fungicide sprays during monsoon season
- Remove fallen leaves and debris regularly
- Monitor for early signs of pests or diseases
- Maintain soil pH between 5.5-7.5
        """.strip()
    },
    
    "Anthracnose": {
        "name": "Anthracnose",
        "severity": "High",
        "description": """
Anthracnose is one of the most serious fungal diseases affecting mango trees, caused by 
Colletotrichum gloeosporioides. It affects leaves, flowers, fruits, and twigs, causing 
significant economic losses. The disease thrives in warm, humid conditions and can spread 
rapidly during the rainy season. Dark brown to black lesions appear on leaves, often with 
a water-soaked appearance that expands quickly under favorable conditions.
        """.strip(),
        "symptoms": [
            "Dark brown to black irregular lesions on leaves",
            "Water-soaked spots that expand rapidly",
            "Leaf blight and premature defoliation",
            "Black streaks on stems and petioles",
            "Fruit rot with sunken dark spots",
            "Flower blight causing blossom drop"
        ],
        "causes": """
Caused by the fungus Colletotrichum gloeosporioides. The disease spreads through:
- Rain splash and wind-borne spores
- High humidity (above 80%) and warm temperatures (24-32°C)
- Poor air circulation in dense canopies
- Wounds or injuries on plant tissue
- Infected plant debris and fallen leaves
        """.strip(),
        "treatment": """
Immediate action required to control the spread:

1. **Chemical Control**:
   - Apply copper-based fungicides (Copper oxychloride 50% WP @ 3g/L)
   - Use systemic fungicides like Carbendazim (0.1%) or Mancozeb (0.25%)
   - Spray at 15-day intervals during disease-prone periods
   - Apply protective sprays before flowering and fruit set

2. **Cultural Practices**:
   - Remove and destroy infected leaves, twigs, and fruits
   - Prune to improve air circulation and light penetration
   - Avoid overhead irrigation to reduce leaf wetness
   - Collect and burn fallen infected plant material

3. **Timing**:
   - Start preventive sprays before monsoon season
   - Spray after each rain during wet periods
   - Continue treatment until symptoms disappear
        """.strip(),
        "prevention": """
- Plant resistant varieties when available
- Maintain proper tree spacing (8-10 meters apart)
- Prune regularly to improve air circulation
- Apply preventive fungicide sprays before rainy season
- Remove water sprouts and maintain tree hygiene
- Avoid excessive nitrogen fertilization
- Ensure good drainage in the orchard
- Use drip irrigation instead of overhead sprinklers
        """.strip()
    },
    
    "Bacterial Canker": {
        "name": "Bacterial Canker",
        "severity": "High",
        "description": """
Bacterial canker, caused by Xanthomonas campestris pv. mangiferaeindicae, is a serious 
bacterial disease that affects all aerial parts of mango trees. It causes characteristic 
cankers on stems, water-soaked lesions on leaves, and black spots on fruits. The disease 
is particularly destructive during warm, humid weather and can lead to significant yield 
losses if not managed properly. The bacteria enter through natural openings or wounds.
        """.strip(),
        "symptoms": [
            "Water-soaked angular leaf spots turning dark brown",
            "Raised cankers on stems and branches with gum exudation",
            "Black spots on fruits with characteristic halo",
            "Leaf blight and premature leaf drop",
            "Twig dieback starting from tips",
            "Cracking and oozing of infected bark"
        ],
        "causes": """
Caused by the bacterium Xanthomonas campestris pv. mangiferaeindicae. Spread through:
- Rain splash and wind-driven rain
- Contaminated pruning tools
- Insect vectors and wounds
- High humidity and warm temperatures (25-30°C)
- Hail damage or mechanical injuries
        """.strip(),
        "treatment": """
Bacterial diseases require immediate and aggressive management:

1. **Chemical Control**:
   - Apply copper-based bactericides (Copper hydroxide @ 2-3g/L)
   - Use Streptocycline (100 ppm) + Copper oxychloride (0.3%)
   - Spray every 10-15 days during active infection
   - Apply after pruning to prevent infection

2. **Sanitation**:
   - Prune infected branches 15-20 cm below visible symptoms
   - Sterilize pruning tools with 10% bleach solution between cuts
   - Remove and burn all infected plant material immediately
   - Avoid working in wet conditions

3. **Wound Protection**:
   - Apply Bordeaux paste on pruning cuts
   - Protect trees from hail and mechanical damage
   - Treat any wounds immediately with copper paste

4. **Integrated Approach**:
   - Combine chemical and cultural methods
   - Monitor regularly for early detection
   - Maintain detailed records of infection sites
        """.strip(),
        "prevention": """
- Use disease-free planting material
- Avoid overhead irrigation, especially during flowering
- Maintain proper tree spacing for air circulation
- Apply preventive copper sprays before monsoon
- Sterilize all pruning equipment regularly
- Protect trees from hail damage with netting
- Remove and destroy infected plant debris
- Avoid excessive nitrogen fertilization
- Plant windbreaks to reduce wind-driven rain
- Implement strict orchard sanitation practices
        """.strip()
    },
    
    "Cutting Weevil": {
        "name": "Cutting Weevil",
        "severity": "Medium",
        "description": """
The mango cutting weevil (Deporaus marginatus) is a significant pest that damages young 
shoots, leaves, and developing fruits. Adult weevils cut tender shoots and leaves, causing 
them to wilt and drop. The larvae bore into shoots and fruits, causing internal damage. 
This pest is particularly problematic during the flushing and flowering stages, potentially 
reducing fruit set and overall yield.
        """.strip(),
        "symptoms": [
            "Clean cuts on tender shoots and leaf stalks",
            "Wilting and drooping of young shoots",
            "Characteristic V-shaped cuts on leaf margins",
            "Premature dropping of young leaves and shoots",
            "Small holes in developing fruits",
            "Presence of small reddish-brown weevils on plants"
        ],
        "causes": """
Caused by the mango cutting weevil (Deporaus marginatus):
- Adult weevils cut and feed on tender plant parts
- Females lay eggs in cut shoots
- Larvae develop inside shoots and fruits
- Peak activity during new flush and flowering
- Favored by warm, dry weather conditions
        """.strip(),
        "treatment": """
Integrated pest management approach for effective control:

1. **Chemical Control**:
   - Apply contact insecticides: Carbaryl 50% WP @ 2g/L
   - Use systemic insecticides: Imidacloprid 17.8% SL @ 0.5ml/L
   - Spray Chlorpyrifos 20% EC @ 2ml/L on affected areas
   - Apply during early morning or evening when weevils are active
   - Repeat applications at 10-15 day intervals

2. **Mechanical Control**:
   - Handpick and destroy adult weevils
   - Collect and burn cut shoots and fallen leaves
   - Shake branches to dislodge weevils into collection sheets
   - Remove and destroy infested plant parts

3. **Biological Control**:
   - Encourage natural predators like birds and parasitic wasps
   - Use pheromone traps to monitor and reduce populations
   - Apply neem-based products (Azadirachtin 0.03%) as repellent

4. **Cultural Practices**:
   - Maintain orchard cleanliness
   - Avoid excessive nitrogen fertilization that promotes tender growth
   - Time irrigation to avoid stress periods
        """.strip(),
        "prevention": """
- Monitor regularly during flushing and flowering periods
- Remove alternate host plants from vicinity
- Maintain balanced nutrition to avoid excessive tender growth
- Use light traps to monitor adult weevil populations
- Apply preventive sprays before peak activity periods
- Encourage natural enemies by avoiding broad-spectrum pesticides
- Maintain proper orchard sanitation
- Use sticky bands on tree trunks to trap climbing weevils
- Plant trap crops at orchard borders
- Implement crop rotation where possible
        """.strip()
    },
    
    "Die Back": {
        "name": "Die Back",
        "severity": "High",
        "description": """
Die back is a serious fungal disease caused by Lasiodiplodia theobromae (formerly 
Botryodiplodia theobromae). It causes progressive death of twigs, branches, and eventually 
entire trees if left untreated. The disease typically starts at branch tips and moves 
downward, causing bark cracking, gum exudation, and eventual death of affected parts. 
It's particularly severe in stressed trees and during hot, dry weather following periods 
of high humidity.
        """.strip(),
        "symptoms": [
            "Drying and death of twigs starting from tips",
            "Downward progression of symptoms along branches",
            "Bark cracking and splitting on affected branches",
            "Gum exudation from infected areas",
            "Withering of leaves without falling",
            "Black discoloration under bark of dead twigs",
            "Fruit rot and mummification"
        ],
        "causes": """
Caused by the fungus Lasiodiplodia theobromae. Contributing factors:
- Tree stress from drought, waterlogging, or nutrient deficiency
- Wounds from pruning, insects, or mechanical damage
- High temperatures following humid periods
- Poor soil drainage and root problems
- Sunburn and heat stress
- Imbalanced fertilization
        """.strip(),
        "treatment": """
Comprehensive management strategy required:

1. **Pruning and Sanitation**:
   - Prune affected branches 30-45 cm below visible symptoms
   - Make clean cuts at an angle to prevent water accumulation
   - Sterilize tools with 10% bleach between cuts
   - Remove all pruned material and burn immediately
   - Apply Bordeaux paste on all pruning wounds

2. **Chemical Treatment**:
   - Spray copper oxychloride (0.3%) on entire canopy
   - Apply systemic fungicides: Carbendazim (0.1%) or Thiophanate methyl (0.1%)
   - Inject trunk with systemic fungicides in severe cases
   - Repeat sprays at 15-day intervals for 2-3 months

3. **Tree Health Management**:
   - Improve soil drainage if waterlogging is present
   - Apply balanced fertilization (avoid excess nitrogen)
   - Ensure adequate irrigation during dry periods
   - Apply organic mulch to maintain soil moisture
   - Correct any nutrient deficiencies through soil testing

4. **Stress Reduction**:
   - Whitewash trunks to prevent sunburn
   - Provide shade during extreme heat
   - Maintain consistent soil moisture
   - Avoid root zone disturbance
        """.strip(),
        "prevention": """
- Prune regularly to remove dead wood and improve air circulation
- Apply protective fungicide sprays during vulnerable periods
- Whitewash main branches and trunk to prevent sunburn
- Ensure good soil drainage
- Avoid mechanical injuries to bark and branches
- Apply balanced fertilization based on soil tests
- Mulch around trees to maintain soil moisture
- Monitor trees regularly for early symptoms

        """.strip()
    },
    
    "Gall Midge": {
        "name": "Gall Midge",
        "severity": "Medium",
        "description": """
Mango gall midge (Procontarinia matteiana) is an insect pest that causes abnormal growth 
formations (galls) on young leaves, shoots, and inflorescences. The tiny flies lay eggs 
on tender plant parts, and the developing larvae cause tissue proliferation, forming 
characteristic galls. Heavy infestations can severely affect new growth and reduce 
flowering, ultimately impacting fruit production. The pest is most active during periods 
of new flush growth.
        """.strip(),
        "symptoms": [
            "Cone-shaped or cylindrical galls on young leaves",
            "Distorted and curled leaf growth",
            "Galls on flower panicles affecting fruit set",
            "Reddish or pinkish discoloration of galls",
            "Stunted growth of affected shoots",
            "Premature dropping of heavily infested leaves",
            "Presence of tiny flies around new growth"
        ],
        "causes": """
Caused by the mango gall midge (Procontarinia matteiana):
- Adult midges lay eggs on tender plant tissues
- Larvae develop inside plant tissue causing gall formation
- Multiple generations per year during favorable conditions
- Peak activity during new flush periods
- Favored by warm, humid weather
        """.strip(),
        "treatment": """
Timely intervention is crucial for effective control:

1. **Chemical Control**:
   - Apply systemic insecticides: Dimethoate 30% EC @ 2ml/L
   - Use Imidacloprid 17.8% SL @ 0.5ml/L during flush periods
   - Spray Thiamethoxam 25% WG @ 0.2g/L on new growth
   - Apply at 10-15 day intervals during active infestation
   - Target sprays when new flush appears

2. **Mechanical Control**:
   - Remove and destroy gall-infested leaves and shoots
   - Prune heavily infested branches
   - Collect fallen galls and burn them
   - Avoid creating conditions for continuous flushing

3. **Cultural Practices**:
   - Regulate flushing through irrigation management
   - Avoid excessive nitrogen that promotes tender growth
   - Maintain orchard sanitation
   - Remove alternate host plants

4. **Biological Control**:
   - Encourage parasitoids and predators
   - Use neem-based products as deterrent
   - Avoid broad-spectrum insecticides that harm beneficials
        """.strip(),
        "prevention": """
- Apply preventive sprays before flush emergence
- Regulate flushing through controlled irrigation and fertilization
- Maintain balanced nutrition (avoid excess nitrogen)
- Encourage natural enemies through habitat management
- Avoid water stress that triggers irregular flushing
- Prune to synchronize flushing across the orchard
- Apply neem oil sprays as preventive measure
        """.strip()
    },
    
    "Powdery Mildew": {
        "name": "Powdery Mildew",
        "severity": "Medium to High",
        "description": """
Powdery mildew, caused by Oidium mangiferae, is a common fungal disease that affects 
mango leaves, flowers, and young fruits. It appears as white to grayish powdery growth 
on plant surfaces. The disease is particularly damaging during flowering, as it can 
cause significant flower and fruit drop, severely reducing yields. Unlike many fungal 
diseases, powdery mildew thrives in dry conditions with moderate temperatures and doesn't 
require free water for infection.
        """.strip(),
        "symptoms": [
            "White to grayish powdery coating on leaves",
            "Powdery growth on flowers and young fruits",
            "Leaf curling and distortion",
            "Premature flower and fruit drop",
            "Stunted growth of affected parts",
            "Yellowing and browning of infected leaves",
            "Reduced fruit set and yield"
        ],
        "causes": """
Caused by the fungus Oidium mangiferae. Favorable conditions:
- Moderate temperatures (20-30°C)
- Low to moderate humidity (50-70%)
- Dry weather with cool nights and warm days
- Poor air circulation in dense canopies
- Shaded conditions
- Spreads through wind-borne spores
        """.strip(),
        "treatment": """
Early intervention provides best control:

1. **Chemical Control**:
   - Apply sulfur-based fungicides: Wettable sulfur 80% WP @ 2-3g/L
   - Use systemic fungicides: Triadimefon 25% WP @ 1g/L
   - Spray Hexaconazole 5% EC @ 2ml/L for severe infections
   - Apply Myclobutanil 10% WP @ 1g/L during flowering

2. **Cultural Control**:
   - Prune to improve air circulation and light penetration
   - Remove heavily infected plant parts
   - Avoid excessive nitrogen fertilization
   - Maintain proper tree spacing
   - Ensure adequate sunlight reaches all parts

3. **Organic Options**:
   - Apply potassium bicarbonate solution (5g/L)
   - Use neem oil (3-5ml/L) as preventive spray
   - Spray milk solution (1:10 dilution) weekly
   - Apply sulfur dust on affected areas

4. **Timing**:
   - Start preventive sprays before flowering
   - Continue through fruit set period
   - Monitor and treat immediately upon detection
        """.strip(),
        "prevention": """
- Plant resistant varieties when available
- Maintain proper tree spacing (8-10 meters)
- Prune regularly to improve air circulation
- Apply preventive sulfur sprays before flowering
- Avoid excessive nitrogen fertilization
- Ensure adequate sunlight penetration
- Monitor regularly during susceptible stages
- Apply balanced fertilization with adequate potassium
- Avoid water stress during flowering
- Use drip irrigation to maintain consistent moisture
        """.strip()
    },
    
    "Sooty Mould": {
        "name": "Sooty Mould",
        "severity": "Low to Medium",
        "description": """
Sooty mould is a fungal condition caused by various fungi (Capnodium spp., Meliola spp.) 
that grow on honeydew secreted by sap-sucking insects like aphids, mealybugs, scales, and 
whiteflies. The black, sooty coating covers leaf surfaces, reducing photosynthesis and 
affecting plant vigor. While not directly parasitic, heavy infestations can significantly 
reduce tree health and fruit quality. Control focuses on managing the honeydew-producing 
insects rather than the mould itself.
        """.strip(),
        "symptoms": [
            "Black, sooty coating on leaf surfaces",
            "Reduced photosynthesis and plant vigor",
            "Sticky honeydew on leaves and fruits",
            "Presence of sap-sucking insects (aphids, scales, mealybugs)",
            "Reduced fruit quality and marketability",
            "Leaf yellowing in severe cases",
            "Coating easily rubs off with fingers"
        ],
        "causes": """
Secondary fungal growth on honeydew from sap-sucking insects:
- Aphids, mealybugs, scales, and whiteflies secrete honeydew
- Various fungi colonize the sugary honeydew
- Poor air circulation promotes development
- High humidity favors fungal growth
- Ant activity often indicates presence of honeydew insects
        """.strip(),
        "treatment": """
Focus on controlling honeydew-producing insects:

1. **Insect Control**:
   - Identify and control the source insects (aphids, scales, mealybugs)
   - Apply systemic insecticides: Imidacloprid 17.8% SL @ 0.5ml/L
   - Use contact insecticides: Acephate 75% SP @ 1g/L
   - Spray horticultural oil (2%) to suffocate insects and remove mould

2. **Mould Removal**:
   - Wash leaves with water spray to remove mould
   - Apply copper-based fungicides if mould persists
   - Use potassium bicarbonate solution (5g/L)
   - Spray neem oil (5ml/L) for both insects and mould

3. **Ant Control**:
   - Control ants that protect honeydew insects
   - Apply sticky bands on tree trunks
   - Use ant baits around tree base
   - Remove ant nests from vicinity

4. **Cultural Practices**:
   - Prune to improve air circulation
   - Remove heavily infested plant parts
   - Maintain tree vigor through proper nutrition
   - Encourage natural predators
        """.strip(),
        "prevention": """
- Monitor regularly for sap-sucking insects
- Control insect populations before they build up
- Encourage natural predators (ladybugs, lacewings, parasitic wasps)
- Avoid excessive nitrogen fertilization that promotes tender growth
- Maintain proper tree spacing and pruning
- Control ant populations that protect honeydew insects
- Maintain balanced plant nutrition
- Ensure good air circulation through pruning
- Apply neem-based products as preventive measure
- Keep orchard floor clean
- Avoid water stress that makes plants susceptible
        """.strip()
    },
    
    "Not a Mango Leaf": {
        "name": "Not a Mango Leaf",
        "severity": "N/A",
        "description": """
The uploaded image does not appear to be a mango leaf or the confidence level is too low 
to make a reliable classification. This could be due to several reasons: the image might 
be of a different plant species, the image quality might be poor, the leaf might be too 
damaged to identify, or the image might not contain a leaf at all. For accurate disease 
diagnosis, please upload a clear, well-lit image of a mango leaf.
        """.strip(),
        "symptoms": [
            "Image does not match mango leaf characteristics",
            "Low confidence in classification",
            "Possible different plant species",
            "Poor image quality or unclear subject"
        ],
        "causes": "Not applicable - this is not a mango leaf or image quality is insufficient",
        "treatment": """
Please upload a valid mango leaf image:

1. **Image Requirements**:
   - Ensure the image is of an actual mango leaf
   - Use clear, well-lit photographs
   - Capture the entire leaf or affected area clearly
   - Avoid blurry or low-resolution images
   - Ensure proper focus on the leaf

2. **Photography Tips**:
   - Take photos in natural daylight
   - Hold camera steady or use a tripod
   - Fill the frame with the leaf
   - Avoid shadows and glare
   - Capture both upper and lower leaf surfaces if possible

3. **What to Photograph**:
   - Mature mango leaves showing symptoms
   - Multiple leaves if disease is widespread
   - Close-ups of specific symptoms
   - Overall tree condition if relevant
        """.strip(),
        "prevention": "Not applicable - please upload a valid mango leaf image for analysis"
    }
}

def get_disease_info(disease_name):
    """Get detailed information about a specific disease"""
    return DISEASE_INFO.get(disease_name, DISEASE_INFO["Not a Mango Leaf"])
