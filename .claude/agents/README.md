# WanderMood UK Travel Data System - Subagents

This directory contains specialized AI subagents for the WanderMood UK travel data system. Each subagent is an expert in a specific domain of UK travel and tourism data.

## Available Subagents

### 🇬🇧 UK Travel Expert (`uk-travel-expert`)
**Primary Focus**: UK destinations and emotional mapping
- Expert in British tourism destinations and regional characteristics
- Creates comprehensive destination databases with emotional mood mapping
- Specializes in cultural significance and authentic local experiences
- Maps activities and experiences to specific emotional states
- Validates destination data using official tourism sources

**Use when**: Creating destination content, mapping locations to emotions, researching UK tourism data

### 🚂 Transport Integration (`transport-integration`)
**Primary Focus**: UK transport networks and journey planning
- Expert in National Rail, coaches, ferries, and domestic flights
- Real-time pricing and route planning systems
- Integration with booking platforms and transport APIs
- Carbon footprint calculations and sustainable travel options
- Accessibility route planning for all mobility needs

**Use when**: Building transport systems, calculating journey costs, integrating transport APIs

### 🏨 Accommodation Specialist (`accommodation-specialist`)  
**Primary Focus**: UK hotels, B&Bs, and unique stays
- Expert in British hospitality and emotion-matched lodging
- Comprehensive accommodation databases with mood mapping
- Pricing intelligence and seasonal rate variations
- Accessibility and quality assurance standards
- Unique UK stays (castles, converted buildings, glamping)

**Use when**: Creating accommodation databases, mapping stays to emotions, researching lodging options

### 🌦️ Seasonal Mood Expert (`seasonal-mood-expert`)
**Primary Focus**: Weather-emotion correlations and seasonal recommendations
- UK seasonal psychology and weather impact on emotions
- Seasonal Affective Disorder considerations for travel
- Weather-mood correlation systems
- Regional microclimate expertise
- Seasonal activity and destination recommendations

**Use when**: Building seasonal recommendation systems, weather-emotion mapping, climate considerations

## How to Use These Subagents

### Automatic Invocation
Claude will automatically use these subagents based on your requests:

```
"Create UK destination data for romantic moods"
→ Automatically uses uk-travel-expert

"Calculate train costs from London to Edinburgh"
→ Automatically uses transport-integration

"Find luxury spa hotels in the Cotswolds"
→ Automatically uses accommodation-specialist

"How does winter weather affect mood in Scotland?"
→ Automatically uses seasonal-mood-expert
```

### Explicit Invocation
You can explicitly request a specific subagent:

```
"Use the uk-travel-expert to create Lake District destination data"
"Have the transport-integration subagent calculate journey options"
"Ask the seasonal-mood-expert about autumn recommendations"
```

## Subagent Specializations

### UK Travel Expert Regions
- **Lake District**: Calm, reflective experiences
- **Scottish Highlands**: Adventurous, romantic wilderness
- **Cotswolds**: Romantic, luxury countryside
- **Cornwall**: Social, celebratory coastal experiences
- **London**: Creative, social urban experiences
- **York**: Reflective, romantic historical experiences
- **Peak District**: Adventurous, calm outdoor experiences
- **Edinburgh**: Creative, celebratory cultural experiences

### Transport Integration Networks
- **Rail**: Avanti West Coast, LNER, GWR, ScotRail, Northern
- **Coach**: National Express, Megabus, local operators
- **Flights**: British Airways, EasyJet, Loganair domestic routes
- **Ferries**: CalMac, Wightlink, Irish Sea connections
- **Local**: TfL London, regional bus networks

### Accommodation Specialist Categories
- **Traditional Hotels**: Boutique, historic, business, luxury
- **Unique Stays**: Castles, lighthouses, railway carriages, treehouses
- **B&Bs**: Family-run, farm stays, coastal, city center
- **Self-Catering**: Cotswold cottages, Highland lodges, coastal homes
- **Specialized**: Spa hotels, boutique hostels, canal boats, glamping

### Seasonal Expert Correlations
- **Spring**: Renewal, optimism, gentle adventure
- **Summer**: Peak energy, social activities, festivals
- **Autumn**: Contemplation, romance, cultural pursuits
- **Winter**: Cozy experiences, luxury retreats, celebrations

## Data Quality Standards

All subagents follow these quality standards:

### UK Travel Expert
- All coordinates verified with multiple sources
- Mood mappings evidence-based and culturally relevant
- Pricing reflects current UK market rates in GBP
- Accessibility information comprehensive and current
- Cultural context includes historical significance

### Transport Integration
- Real-time availability and booking systems
- Accurate journey times with connection buffers
- Carbon footprint data for sustainable choices
- Accessibility options for all mobility needs
- Current market pricing with discount options

### Accommodation Specialist
- Verified current pricing through booking platforms
- Quality ratings from multiple sources
- Accessibility information validated
- Seasonal pricing variations documented
- Local character and authenticity verified

### Seasonal Mood Expert
- Weather correlations based on psychological research
- UK-specific climate and cultural considerations
- Regional microclimate variations included
- Accessibility of seasonal activities documented
- Traditional British seasonal celebrations mapped

## API Integrations

The subagents are designed to work with these UK travel APIs:

### Official Tourism APIs
- **VisitBritain API**: Official tourism data and destinations
- **National Rail Enquiries**: Train times, pricing, and booking
- **TransportAPI**: Comprehensive UK transport data
- **TfL Unified API**: London transport integration

### Commercial APIs
- **Booking.com**: Hotel and accommodation data
- **Expedia**: Travel packages and pricing
- **Met Office**: Official UK weather data
- **Google Places**: Local business and attraction data

## Collaborative Workflows

Subagents are designed to work together:

### Complete Trip Planning
1. **uk-travel-expert**: Identifies perfect destination for mood
2. **transport-integration**: Calculates optimal journey routes
3. **accommodation-specialist**: Finds mood-matched lodging
4. **seasonal-mood-expert**: Optimizes timing and activities

### Mood-Destination Optimization
1. **seasonal-mood-expert**: Analyzes current season impact
2. **uk-travel-expert**: Maps destinations to enhanced moods
3. **accommodation-specialist**: Matches lodging to experience
4. **transport-integration**: Provides sustainable travel options

## Contributing to Subagent Development

### Adding New Destinations
Use **uk-travel-expert** to:
- Research authentic local experiences
- Map emotional characteristics
- Validate cultural significance
- Include accessibility information

### Updating Transport Data
Use **transport-integration** to:
- Verify current pricing and routes
- Check accessibility features
- Update booking information
- Calculate carbon footprints

### Expanding Accommodation Options
Use **accommodation-specialist** to:
- Research unique UK stays
- Map properties to emotional experiences
- Verify quality and accessibility
- Update seasonal pricing

### Seasonal Optimization
Use **seasonal-mood-expert** to:
- Research weather-emotion correlations
- Map seasonal activities to moods
- Include UK-specific cultural events
- Consider accessibility in different seasons

## Best Practices

### When Working with Subagents
1. **Be Specific**: Mention the exact region, mood, or service needed
2. **Consider Seasons**: Always factor in UK weather and seasonal variations
3. **Include Accessibility**: Ensure all recommendations consider diverse needs
4. **Verify Data**: Cross-reference with official UK tourism sources
5. **Cultural Sensitivity**: Respect local traditions and authentic experiences

### Quality Assurance
- All pricing in GBP with current market rates
- Accessibility information comprehensive and accurate
- Cultural recommendations authentic and respectful
- Environmental impact considered for sustainability
- Safety information current and comprehensive

---

**Need Help?** 
- Use `/agents` command to manage subagents
- Explicitly request subagents: "Use [subagent-name] to..."
- Combine subagents: "Have uk-travel-expert and transport-integration work together on..."

**Last Updated**: System deployment
**Version**: 1.0.0