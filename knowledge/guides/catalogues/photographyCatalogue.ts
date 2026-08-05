import type {
  GuideCatalogue,
} from "./GuideCatalogue";

import {
  generateCategoryCatalogueItems,
} from "./generators";

import {
  photographyGeneratedSeeds,
} from "./photographyGeneratedSeeds";

const generatedPhotographyItems =
  generateCategoryCatalogueItems({
    category:
      "Photography",

    seeds:
      photographyGeneratedSeeds,

    defaultPriority:
      3,
  });

export const photographyCatalogue:
  GuideCatalogue = {
  id:
    "photography",

  name:
    "Photography Guide Catalogue",

  defaults: {
    category:
      "Photography",

    audience:
      "Camera buyers and photographers",

    recommendationTopic:
      "Beginner cameras",

     status:
          "READY",

    priority:
      3,

      
  },

  items: [
    {
      id:
        "photography-beginner-guide",

      slug:
        "ultimate-beginner-photography-buying-guide",

      title:
        "The Ultimate Beginner Photography Buying Guide",

      topic:
        "Beginner photography",

      type:
        "BUYING_GUIDE",

      primaryKeyword:
        "beginner photography buying guide",

      secondaryKeywords: [
        "best beginner camera",
        "first camera",
        "beginner photography equipment",
      ],

      audience:
        "First-time camera buyers",

      recommendationTopic:
        "Beginner cameras",

      status:
        "PUBLISHED",

      priority:
        5,
    },

    {
      id:
        "photography-mirrorless-vs-dslr",

      slug:
        "mirrorless-vs-dslr",

      title:
        "Mirrorless vs DSLR",

      topic:
        "Mirrorless vs DSLR",

      type:
        "COMPARISON",

      primaryKeyword:
        "mirrorless vs DSLR",

      secondaryKeywords: [
        "DSLR vs mirrorless",
        "should I buy mirrorless or DSLR",
      ],

      audience:
        "Camera buyers",

      recommendationTopic:
        "Beginner cameras",

      status:
        "PUBLISHED",

      priority:
        5,
    },

    {
      id:
        "photography-apsc-vs-full-frame",

      slug:
        "aps-c-vs-full-frame",

      title:
        "APS-C vs Full Frame",

      topic:
        "APS-C vs Full Frame",

      type:
        "COMPARISON",

      primaryKeyword:
        "APS-C vs full frame",

      secondaryKeywords: [
        "full frame vs APS-C",
        "camera sensor size comparison",
      ],

      audience:
        "Camera buyers",

      recommendationTopic:
        "Beginner cameras",

      status:
        "PUBLISHED",

      priority:
        5,
    },

    {
      title:
        "How to Choose Your First Camera Lens",

      topic:
        "First camera lens",

      type:
        "BUYING_GUIDE",

      primaryKeyword:
        "first camera lens",

      secondaryKeywords: [
        "best first lens",
        "beginner camera lens",
        "kit lens upgrade",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Prime vs Zoom Lenses",

      topic:
        "Prime vs zoom lenses",

      type:
        "COMPARISON",

      primaryKeyword:
        "prime vs zoom lens",

      secondaryKeywords: [
        "prime lens or zoom lens",
        "best lens for beginners",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "Best Beginner Cameras Under £500",

      topic:
        "Beginner cameras under £500",

      type:
        "BUDGET_GUIDE",

      primaryKeyword:
        "best beginner camera under £500",

      secondaryKeywords: [
        "cheap beginner camera",
        "camera under £500",
      ],

      audience:
        "Budget-conscious beginners",

      recommendationTopic:
        "Beginner cameras",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "Best Beginner Cameras Under £1,000",

      topic:
        "Beginner cameras under £1,000",

      type:
        "BUDGET_GUIDE",

      primaryKeyword:
        "best beginner camera under £1000",

      secondaryKeywords: [
        "camera under £1000",
        "best mirrorless camera under £1000",
      ],

      audience:
        "Beginner and enthusiast photographers",

      recommendationTopic:
        "Beginner cameras",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "The Complete Guide to Buying a Used Camera",

      topic:
        "Used cameras",

      type:
        "BUYING_GUIDE",

      primaryKeyword:
        "buying a used camera",

      secondaryKeywords: [
        "used camera checklist",
        "second-hand camera buying guide",
      ],

      audience:
        "Value-conscious camera buyers",

      recommendationTopic:
        "Used beginner cameras",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "The Biggest Beginner Camera Buying Mistakes",

      topic:
        "Camera buying mistakes",

      type:
        "MISTAKES",

      primaryKeyword:
        "camera buying mistakes",

      secondaryKeywords: [
        "beginner camera mistakes",
        "what to avoid when buying a camera",
      ],

      audience:
        "First-time camera buyers",

      priority:
        4,

         status:
          "READY",
    },

    {
      title:
        "Essential Camera Accessories for Beginners",

      topic:
        "Camera accessories",

      type:
        "BUYING_GUIDE",

      primaryKeyword:
        "camera accessories for beginners",

      secondaryKeywords: [
        "essential camera accessories",
        "beginner photography equipment",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Photography accessories",

      priority:
        4,

         status:
          "READY",
    },
       {
  title:
    "Best Mirrorless Cameras Under £500",

  topic:
    "Mirrorless cameras under £500",

  type:
    "BUDGET_GUIDE",

  primaryKeyword:
    "best mirrorless camera under £500",

  secondaryKeywords: [
    "mirrorless camera under £500",
    "cheap mirrorless camera",
    "budget mirrorless camera",
  ],

  audience:
    "Budget-conscious camera buyers",

  recommendationTopic:
    "Beginner cameras",

  status:
    "READY",

  priority:
    5,
},

    {
      title:
        "Best Mirrorless Cameras Under £1,000",

      topic:
        "Mirrorless cameras under £1,000",

      type:
        "BUDGET_GUIDE",

      primaryKeyword:
        "best mirrorless camera under £1000",

      secondaryKeywords: [
        "mirrorless camera under £1000",
        "best camera under £1000",
        "mid-range mirrorless camera",
      ],

      audience:
        "Beginner and enthusiast photographers",

      recommendationTopic:
        "Beginner cameras",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "Best Cameras Under £1,500",

      topic:
        "Cameras under £1,500",

      type:
        "BUDGET_GUIDE",

      primaryKeyword:
        "best camera under £1500",

      secondaryKeywords: [
        "mirrorless camera under £1500",
        "best enthusiast camera",
        "camera under £1500",
      ],

      audience:
        "Enthusiast photographers",

      recommendationTopic:
        "Enthusiast cameras",

      priority:
        4,

         status:
          "READY",
    },

    {
      title:
        "Best Cameras for Complete Beginners",

      topic:
        "Cameras for complete beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for complete beginners",

      secondaryKeywords: [
        "easiest camera for beginners",
        "first camera for beginners",
        "beginner-friendly camera",
      ],

      audience:
        "First-time camera buyers",

      recommendationTopic:
        "Beginner cameras",

      priority:
        5,

         status:
          "READY",
    },

    {
      title:
        "Best Cameras for Family Photography",

      topic:
        "Cameras for family photography",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for family photography",

      secondaryKeywords: [
        "best camera for family photos",
        "camera for children and pets",
        "family camera buying guide",
      ],

      audience:
        "Parents and family photographers",

      recommendationTopic:
        "Family cameras",

      priority:
        4,

        status:
          "READY",

        
    },

    {
      title:
        "Best Cameras for Travel Photography",

      topic:
        "Cameras for travel photography",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for travel photography",

      secondaryKeywords: [
        "best travel camera",
        "lightweight travel camera",
        "compact camera for holidays",
      ],

      audience:
        "Travellers and holiday photographers",

      recommendationTopic:
        "Travel cameras",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Best Cameras for Wildlife Beginners",

      topic:
        "Cameras for beginner wildlife photography",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for beginner wildlife photography",

      secondaryKeywords: [
        "wildlife camera for beginners",
        "best budget wildlife camera",
        "camera for birds and animals",
      ],

      audience:
        "Beginner wildlife photographers",

      recommendationTopic:
        "Wildlife cameras",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Best Cameras for Sports Photography Beginners",

      topic:
        "Cameras for beginner sports photography",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for beginner sports photography",

      secondaryKeywords: [
        "sports camera for beginners",
        "budget sports photography camera",
        "camera for action photography",
      ],

      audience:
        "Beginner sports photographers",

      recommendationTopic:
        "Sports cameras",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "Best Cameras for YouTube Beginners",

      topic:
        "Cameras for beginner YouTube creators",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best camera for YouTube beginners",

      secondaryKeywords: [
        "beginner YouTube camera",
        "best camera for content creators",
        "camera for YouTube videos",
      ],

      audience:
        "New YouTube and video creators",

      recommendationTopic:
        "Creator cameras",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "Should You Buy a Camera Body Only or a Kit?",

      topic:
        "Camera body versus kit purchase",

      type:
        "COMPARISON",

      primaryKeyword:
        "camera body only vs kit lens",

      secondaryKeywords: [
        "should I buy camera body only",
        "camera kit or body only",
        "is a camera kit lens worth it",
      ],

      audience:
        "First-time camera buyers",

      recommendationTopic:
        "Beginner cameras",

      priority:
        4,

        status:
          "READY",
    },
        {
      title:
        "Best First Lenses for Beginner Photographers",

      topic:
        "First lenses for beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best first lens for beginners",

      secondaryKeywords: [
        "beginner camera lens",
        "best starter lens",
        "first lens after kit lens",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Best Portrait Lenses for Beginners",

      topic:
        "Portrait lenses for beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best portrait lens for beginners",

      secondaryKeywords: [
        "beginner portrait lens",
        "best lens for portraits",
        "affordable portrait lens",
      ],

      audience:
        "Beginner portrait photographers",

      recommendationTopic:
        "Portrait lenses",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Best Travel Lenses for Beginners",

      topic:
        "Travel lenses for beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best travel lens for beginners",

      secondaryKeywords: [
        "best lens for travel photography",
        "lightweight travel lens",
        "all-purpose travel lens",
      ],

      audience:
        "Beginner travel photographers",

      recommendationTopic:
        "Travel lenses",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "Best Wildlife Lenses for Beginners",

      topic:
        "Wildlife lenses for beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best wildlife lens for beginners",

      secondaryKeywords: [
        "beginner wildlife lens",
        "budget wildlife photography lens",
        "best telephoto lens for beginners",
      ],

      audience:
        "Beginner wildlife photographers",

      recommendationTopic:
        "Wildlife lenses",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Best Street Photography Lenses for Beginners",

      topic:
        "Street photography lenses for beginners",

      type:
        "BEST_FOR",

      primaryKeyword:
        "best street photography lens for beginners",

      secondaryKeywords: [
        "beginner street photography lens",
        "35mm lens for street photography",
        "compact street photography lens",
      ],

      audience:
        "Beginner street photographers",

      recommendationTopic:
        "Street photography lenses",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "35mm vs 50mm Lens: Which Should You Buy First?",

      topic:
        "35mm vs 50mm lenses",

      type:
        "COMPARISON",

      primaryKeyword:
        "35mm vs 50mm lens",

      secondaryKeywords: [
        "35mm or 50mm for beginners",
        "best first prime lens",
        "50mm vs 35mm photography",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        5,

        status:
          "READY",
    },

    {
      title:
        "Kit Lens vs Prime Lens",

      topic:
        "Kit lens vs prime lens",

      type:
        "COMPARISON",

      primaryKeyword:
        "kit lens vs prime lens",

      secondaryKeywords: [
        "should I replace my kit lens",
        "prime lens after kit lens",
        "kit lens or prime lens",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        4,
    },

    {
      title:
        "What Does Lens Aperture Mean?",

      topic:
        "Lens aperture",

      type:
        "EXPLAINER",

      primaryKeyword:
        "what does lens aperture mean",

      secondaryKeywords: [
        "camera aperture explained",
        "f stop explained",
        "wide aperture lens",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "What Does Focal Length Mean?",

      topic:
        "Camera lens focal length",

      type:
        "EXPLAINER",

      primaryKeyword:
        "what does focal length mean",

      secondaryKeywords: [
        "camera focal length explained",
        "lens focal length guide",
        "what does mm mean on a lens",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        4,

        status:
          "READY",
    },

    {
      title:
        "The Biggest Beginner Lens Buying Mistakes",

      topic:
        "Beginner lens buying mistakes",

      type:
        "MISTAKES",

      primaryKeyword:
        "lens buying mistakes",

      secondaryKeywords: [
        "beginner lens mistakes",
        "what to avoid when buying a lens",
        "camera lens buying advice",
      ],

      audience:
        "Beginner photographers",

      recommendationTopic:
        "Beginner lenses",

      priority:
        4,

        status:
          "READY",
    },
    {
  title:
    "Beginner Guide to Portrait Photography Equipment",

  topic:
    "Portrait photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "portrait photography equipment for beginners",

  secondaryKeywords: [
    "beginner portrait photography gear",
    "portrait camera and lens guide",
    "portrait photography kit",
  ],

  audience:
    "Beginner portrait photographers",

  recommendationTopic:
    "Portrait photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Wildlife Photography Equipment",

  topic:
    "Wildlife photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "wildlife photography equipment for beginners",

  secondaryKeywords: [
    "beginner wildlife photography gear",
    "wildlife camera and lens guide",
    "wildlife photography kit",
  ],

  audience:
    "Beginner wildlife photographers",

  recommendationTopic:
    "Wildlife photography equipment",

  priority:
    5,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Travel Photography Equipment",

  topic:
    "Travel photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "travel photography equipment for beginners",

  secondaryKeywords: [
    "beginner travel photography gear",
    "travel camera kit",
    "lightweight photography equipment",
  ],

  audience:
    "Beginner travel photographers",

  recommendationTopic:
    "Travel photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Street Photography Equipment",

  topic:
    "Street photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "street photography equipment for beginners",

  secondaryKeywords: [
    "beginner street photography gear",
    "street camera and lens guide",
    "compact street photography setup",
  ],

  audience:
    "Beginner street photographers",

  recommendationTopic:
    "Street photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Landscape Photography Equipment",

  topic:
    "Landscape photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "landscape photography equipment for beginners",

  secondaryKeywords: [
    "beginner landscape photography gear",
    "landscape camera and lens guide",
    "landscape photography kit",
  ],

  audience:
    "Beginner landscape photographers",

  recommendationTopic:
    "Landscape photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Sports Photography Equipment",

  topic:
    "Sports photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "sports photography equipment for beginners",

  secondaryKeywords: [
    "beginner sports photography gear",
    "sports camera and lens guide",
    "action photography equipment",
  ],

  audience:
    "Beginner sports photographers",

  recommendationTopic:
    "Sports photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Wedding Photography Equipment",

  topic:
    "Wedding photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "wedding photography equipment for beginners",

  secondaryKeywords: [
    "beginner wedding photography gear",
    "wedding camera and lens guide",
    "wedding photography kit",
  ],

  audience:
    "Aspiring wedding photographers",

  recommendationTopic:
    "Wedding photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Night Photography Equipment",

  topic:
    "Night photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "night photography equipment for beginners",

  secondaryKeywords: [
    "low light photography gear",
    "night photography camera and lens",
    "beginner night photography kit",
  ],

  audience:
    "Beginner low-light photographers",

  recommendationTopic:
    "Night photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Macro Photography Equipment",

  topic:
    "Macro photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "macro photography equipment for beginners",

  secondaryKeywords: [
    "beginner macro photography gear",
    "macro camera and lens guide",
    "macro photography setup",
  ],

  audience:
    "Beginner macro photographers",

  recommendationTopic:
    "Macro photography equipment",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Beginner Guide to Product Photography Equipment",

  topic:
    "Product photography equipment",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "product photography equipment for beginners",

  secondaryKeywords: [
    "beginner product photography gear",
    "product photography camera setup",
    "home product photography kit",
  ],

  audience:
    "Small businesses and beginner product photographers",

  recommendationTopic:
    "Product photography equipment",

  priority:
    4,

    status:
          "READY",
},
{
  title:
    "Best Camera Bags for Beginner Photographers",

  topic:
    "Camera bags for beginners",

  type:
    "BEST_FOR",

  primaryKeyword:
    "best camera bag for beginners",

  secondaryKeywords: [
    "beginner camera bag",
    "best photography bag",
    "camera backpack for beginners",
  ],

  audience:
    "Beginner photographers",

  recommendationTopic:
    "Camera bags",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Best Tripods for Beginner Photographers",

  topic:
    "Tripods for beginners",

  type:
    "BEST_FOR",

  primaryKeyword:
    "best tripod for beginners",

  secondaryKeywords: [
    "beginner photography tripod",
    "best budget camera tripod",
    "tripod buying guide",
  ],

  audience:
    "Beginner photographers",

  recommendationTopic:
    "Photography tripods",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Best Memory Cards for Cameras",

  topic:
    "Camera memory cards",

  type:
    "BEST_FOR",

  primaryKeyword:
    "best memory card for cameras",

  secondaryKeywords: [
    "best SD card for camera",
    "camera memory card buying guide",
    "SD card for photography",
  ],

  audience:
    "Camera owners and photographers",

  recommendationTopic:
    "Camera memory cards",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "How to Choose the Right Camera Memory Card",

  topic:
    "Choosing a camera memory card",

  type:
    "BUYING_GUIDE",

  primaryKeyword:
    "how to choose a camera memory card",

  secondaryKeywords: [
    "camera SD card guide",
    "memory card speed for photography",
    "which SD card for my camera",
  ],

  audience:
    "Camera owners and beginner photographers",

  recommendationTopic:
    "Camera memory cards",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Best External Storage for Photographers",

  topic:
    "External storage for photographers",

  type:
    "BEST_FOR",

  primaryKeyword:
    "best external storage for photographers",

  secondaryKeywords: [
    "best external SSD for photography",
    "photo backup drive",
    "photography storage solution",
  ],

  audience:
    "Photographers managing growing photo libraries",

  recommendationTopic:
    "Photography storage",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "Canon vs Sony Cameras",

  topic:
    "Canon vs Sony cameras",

  type:
    "COMPARISON",

  primaryKeyword:
    "Canon vs Sony cameras",

  secondaryKeywords: [
    "Sony or Canon camera",
    "Canon vs Sony for beginners",
    "best camera brand",
  ],

  audience:
    "Camera buyers comparing systems",

  recommendationTopic:
    "Beginner cameras",

  priority:
    5,

    status:
          "READY",
},

{
  title:
    "Canon vs Nikon Cameras",

  topic:
    "Canon vs Nikon cameras",

  type:
    "COMPARISON",

  primaryKeyword:
    "Canon vs Nikon cameras",

  secondaryKeywords: [
    "Nikon or Canon camera",
    "Canon vs Nikon for beginners",
    "best DSLR and mirrorless brand",
  ],

  audience:
    "Camera buyers comparing systems",

  recommendationTopic:
    "Beginner cameras",

  priority:
    5,

    status:
          "READY",
},

{
  title:
    "Sony vs Fujifilm Cameras",

  topic:
    "Sony vs Fujifilm cameras",

  type:
    "COMPARISON",

  primaryKeyword:
    "Sony vs Fujifilm cameras",

  secondaryKeywords: [
    "Fujifilm or Sony camera",
    "Sony vs Fujifilm for beginners",
    "best APS-C camera system",
  ],

  audience:
    "Mirrorless camera buyers",

  recommendationTopic:
    "Beginner cameras",

  priority:
    5,

    status:
          "READY",
},

{
  title:
    "Micro Four Thirds vs APS-C",

  topic:
    "Micro Four Thirds vs APS-C",

  type:
    "COMPARISON",

  primaryKeyword:
    "Micro Four Thirds vs APS-C",

  secondaryKeywords: [
    "APS-C or Micro Four Thirds",
    "camera sensor size comparison",
    "best compact camera system",
  ],

  audience:
    "Camera buyers comparing sensor systems",

  recommendationTopic:
    "Beginner cameras",

  priority:
    4,

    status:
          "READY",
},

{
  title:
    "The Biggest Camera Accessory Buying Mistakes",

  topic:
    "Camera accessory buying mistakes",

  type:
    "MISTAKES",

  primaryKeyword:
    "camera accessory buying mistakes",

  secondaryKeywords: [
    "photography accessory mistakes",
    "what camera accessories not to buy",
    "beginner photography gear mistakes",
  ],

  audience:
    "Beginner photographers",

  recommendationTopic:
    "Photography accessories",

  priority:
    3,
     status:
          "READY",
    
},
    ...generatedPhotographyItems,
  ],
};