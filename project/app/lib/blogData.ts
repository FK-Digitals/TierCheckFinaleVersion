export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'draft' | 'published';
  likes: number;
  comments: number;
  slug: string;
  readTime: string;
  affiliateProducts?: AffiliateProduct[];
  animalType?: string;
}

export interface AffiliateProduct {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  url: string;
  buttonText?: string;
  buttonColor?: string;
  buttonStyle?: string;
  buttonSize?: string;
  buttonIcon?: string;
  buttonAnimation?: string;
}

export interface AnimalType {
  id: number;
  name: string;
  icon: string;
  color: string;
}

// Static blog posts (original articles)
export const staticBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Die richtige Ernährung für Katzen - Ein umfassender Guide",
    excerpt: "Alles was du über die optimale Ernährung deiner Katze wissen musst. Von Kitten bis Senior - die besten Tipps für gesunde Fütterung.",
    author: "Dr. Sarah Müller",
    date: "15. Januar 2024",
    category: "Ernährung",
    image: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 234,
    comments: 18,
    slug: "katzen-ernaehrung-guide",
    readTime: "8 min",
    content: `
# Die richtige Ernährung für Katzen

Katzen sind wahre Feinschmecker und haben ganz spezielle Ernährungsbedürfnisse. Als obligate Fleischfresser benötigen sie eine proteinreiche Nahrung, die alle essentiellen Nährstoffe enthält.

## Was brauchen Katzen?

### Proteine
Katzen benötigen deutlich mehr Protein als Hunde - mindestens 26% in der Trockensubstanz. Hochwertiges Fleisch sollte die Hauptzutat sein.

### Taurin
Dieser Aminosäure-Baustein ist lebenswichtig für Katzen. Ein Mangel kann zu Herzproblemen und Blindheit führen.

### Wasser
Katzen trinken von Natur aus wenig. Nassfutter hilft dabei, den Flüssigkeitsbedarf zu decken.

## Fütterungsempfehlungen

- **Kitten (bis 12 Monate):** 3-4 Mahlzeiten täglich mit speziellem Kittenfutter
- **Erwachsene Katzen:** 2 Mahlzeiten täglich
- **Senioren (ab 7 Jahre):** Leicht verdauliches Futter, eventuell häufigere kleine Portionen

## Was ist zu vermeiden?

- Schokolade (giftig!)
- Zwiebeln und Knoblauch
- Trauben und Rosinen
- Zu viele Leckerlis (max. 10% der täglichen Kalorienmenge)

Eine ausgewogene Ernährung ist der Grundstein für ein langes, gesundes Katzenleben. Bei Unsicherheiten solltest du immer deinen Tierarzt konsultieren.
    `,
    affiliateProducts: [
      {
        title: "Premium Katzenfutter - Naturbelassen",
        description: "Hochwertiges Nassfutter ohne Zusatzstoffe",
        price: "24,99€",
        originalPrice: "29,99€",
        image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        url: "https://example.com/premium-katzenfutter"
      },
      {
        title: "Automatischer Futterautomat",
        description: "Für regelmäßige Fütterung auch wenn du nicht da bist",
        price: "89,99€",
        image: "https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        url: "https://example.com/futterautomat"
      }
    ]
  },
  {
    id: 2,
    title: "Hundeerziehung leicht gemacht - Die besten Trainingsmethoden",
    excerpt: "Positive Verstärkung, Clickertraining und mehr. Entdecke die effektivsten Methoden für eine harmonische Beziehung zu deinem Hund.",
    author: "Dr. Max Weber",
    date: "12. Januar 2024",
    category: "Training",
    image: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 189,
    comments: 24,
    slug: "hundeerziehung-trainingsmethoden",
    readTime: "10 min",
    content: `
# Hundeerziehung leicht gemacht

Die Erziehung eines Hundes basiert auf Vertrauen, Geduld und den richtigen Methoden. Moderne Hundeerziehung setzt auf positive Verstärkung statt auf Dominanz.

## Grundprinzipien der positiven Verstärkung

### Belohnung zur richtigen Zeit
Belohne deinen Hund sofort, wenn er das gewünschte Verhalten zeigt. Das Timing ist entscheidend!

### Konsistenz ist der Schlüssel
Alle Familienmitglieder sollten die gleichen Kommandos und Regeln verwenden.

## Die wichtigsten Grundkommandos

### "Sitz"
Das erste und wichtigste Kommando. Halte ein Leckerli über die Nase des Hundes und führe es langsam nach hinten.

### "Platz"
Aus der Sitz-Position das Leckerli zum Boden führen. Geduld ist hier besonders wichtig.

### "Hier" oder "Komm"
Niemals schimpfen, wenn der Hund kommt - auch wenn er vorher Unsinn gemacht hat!

## Clickertraining

Der Clicker ist ein präzises Werkzeug für das Training:

1. **Konditionierung:** Clicker = Leckerli
2. **Timing:** Click genau im Moment des gewünschten Verhaltens
3. **Belohnung:** Nach jedem Click folgt eine Belohnung

## Häufige Fehler vermeiden

- Nicht schreien oder körperlich bestrafen
- Nicht inkonsequent sein
- Nicht zu lange Trainingseinheiten (5-10 Minuten reichen)
- Nicht bei schlechter Laune trainieren

Mit Geduld und den richtigen Methoden wird dein Hund zu einem wunderbaren Begleiter!
    `,
    affiliateProducts: [
      {
        title: "Clicker-Training Set",
        description: "Professionelles Set für das Hundetraining",
        price: "19,99€",
        image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        url: "https://example.com/clicker-training-set"
      }
    ]
  },
  {
    id: 3,
    title: "Kaninchenhaltung für Anfänger - Der komplette Ratgeber",
    excerpt: "Von der richtigen Einrichtung bis zur täglichen Pflege. Alles was Kaninchen-Neulinge wissen müssen für glückliche Langohren.",
    author: "Lisa Schmidt",
    date: "10. Januar 2024",
    category: "Haltung",
    image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 156,
    comments: 31,
    slug: "kaninchenhaltung-anfaenger",
    readTime: "12 min",
    content: `
# Kaninchenhaltung für Anfänger

Kaninchen sind wunderbare Haustiere, aber sie haben spezielle Bedürfnisse. Hier erfährst du alles für einen guten Start.

## Die richtige Unterkunft

### Größe ist wichtig
- Mindestens 2m² Grundfläche pro Kaninchen
- Höhe mindestens 60cm für aufrechtes Stehen
- Zusätzlich täglich mehrere Stunden Auslauf

### Einrichtung
- Versteckmöglichkeiten (Häuschen, Tunnel)
- Verschiedene Ebenen
- Futter- und Wassernäpfe
- Heuraufe
- Toilettenecke mit Einstreu

## Ernährung

### Grundnahrung
- **Heu:** Immer verfügbar, wichtig für die Verdauung
- **Frischfutter:** Täglich Gemüse und Kräuter
- **Pellets:** Nur kleine Mengen (20-30g pro kg Körpergewicht)

### Geeignetes Frischfutter
- Möhren, Fenchel, Sellerie
- Petersilie, Dill, Basilikum
- Löwenzahn, Giersch (aus pestizidfreien Gebieten)

## Sozialverhalten

Kaninchen sind Gruppentiere und sollten niemals allein gehalten werden. Ideal ist die Paarhaltung mit einem kastrierten Männchen und einem Weibchen.

## Gesundheit

### Regelmäßige Kontrollen
- Gewicht wöchentlich kontrollieren
- Zähne und Krallen regelmäßig prüfen
- Bei Auffälligkeiten sofort zum Tierarzt

### Impfungen
- RHD (Chinaseuche)
- Myxomatose
- Jährliche Auffrischung nötig

## Beschäftigung

Kaninchen brauchen geistige und körperliche Beschäftigung:
- Intelligenzspielzeug
- Tunnel und Verstecke
- Äste zum Knabbern
- Wechselnde Einrichtung

Mit der richtigen Vorbereitung werden deine Kaninchen zu glücklichen und gesunden Mitbewohnern!
    `,
    affiliateProducts: [
      {
        title: "Kaninchen-Heuraufe aus Naturholz",
        description: "Praktische und artgerechte Heuraufe",
        price: "15,99€",
        image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        url: "https://example.com/kaninchen-heuraufe"
      }
    ]
  },
  {
    id: 4,
    title: "Vogelpflege im Winter - Tipps für die kalte Jahreszeit",
    excerpt: "Wie du deine gefiederten Freunde gesund durch den Winter bringst. Fütterung, Beleuchtung und Pflege in der kalten Jahreszeit.",
    author: "Dr. Thomas Klein",
    date: "8. Januar 2024",
    category: "Pflege",
    image: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 298,
    comments: 42,
    slug: "vogelpflege-winter",
    readTime: "6 min",
    content: `
# Vogelpflege im Winter

Die kalte Jahreszeit stellt besondere Anforderungen an die Pflege von Ziervögeln. Mit den richtigen Maßnahmen kommen deine gefiederten Freunde gesund durch den Winter.

## Temperatur und Luftfeuchtigkeit

### Optimale Bedingungen
- Temperatur: 18-22°C konstant halten
- Luftfeuchtigkeit: 50-60%
- Zugluft unbedingt vermeiden

### Heizung richtig einsetzen
- Keine direkte Heizungsluft
- Luftbefeuchter verwenden
- Regelmäßig lüften (kurz und kräftig)

## Beleuchtung im Winter

### Tageslichtmangel ausgleichen
- Spezielle Vogellampen verwenden
- 10-12 Stunden Licht täglich
- UV-Anteil für Vitamin D-Synthese

## Winterfütterung

### Energiereiche Nahrung
- Mehr Samen und Nüsse
- Frisches Obst und Gemüse
- Vitaminpräparate nach Bedarf

### Wasserzufuhr
- Frisches Wasser täglich
- Trinktemperatur beachten
- Luftfeuchtigkeit durch Wasserschalen

## Gesundheitsvorsorge

### Regelmäßige Kontrollen
- Gewicht wöchentlich prüfen
- Gefieder auf Veränderungen kontrollieren
- Bei Auffälligkeiten sofort zum Tierarzt

Mit der richtigen Winterpflege bleiben deine Vögel gesund und munter!
    `,
    affiliateProducts: []
  },
  {
    id: 5,
    title: "Hamster richtig füttern - Gesunde Ernährung für kleine Nager",
    excerpt: "Was gehört in den Hamster-Napf? Alles über artgerechte Ernährung, verbotene Lebensmittel und gesunde Leckerlis für Hamster.",
    author: "Anna Hoffmann",
    date: "5. Januar 2024",
    category: "Ernährung",
    image: "https://images.pexels.com/photos/33235/hamster-rodent-pet-cute.jpg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 187,
    comments: 23,
    slug: "hamster-gesunde-ernaehrung",
    readTime: "7 min",
    content: `
# Hamster richtig füttern

Die richtige Ernährung ist entscheidend für die Gesundheit und das Wohlbefinden deines Hamsters. Hier erfährst du alles über artgerechte Fütterung.

## Grundnahrung für Hamster

### Hochwertiges Trockenfutter
- Samenmischung als Basis
- 15-20g täglich für Goldhamster
- 5-8g täglich für Zwerghamster

### Frischfutter
- Täglich kleine Mengen Gemüse
- Obst nur als gelegentlicher Leckerbissen
- Immer gut waschen

## Geeignete Lebensmittel

### Gemüse
- Möhren, Gurke, Paprika
- Brokkoli, Blumenkohl
- Salat (in Maßen)

### Obst
- Apfel (ohne Kerne)
- Birne, Beeren
- Melone (ohne Kerne)

### Proteine
- Gekochtes Ei (1x wöchentlich)
- Mehlwürmer (getrocknet)
- Quark (ungesüßt)

## Verbotene Lebensmittel

### Giftig für Hamster
- Schokolade und Süßigkeiten
- Zwiebeln und Knoblauch
- Avocado
- Zitrusfrüchte
- Rohe Bohnen

## Fütterungszeiten

### Abends füttern
- Hamster sind nachtaktiv
- Hauptmahlzeit am Abend
- Frischfutter morgens entfernen

## Wasser

### Immer verfügbar
- Frisches Wasser täglich
- Trinkflasche bevorzugt
- Regelmäßig reinigen

Mit der richtigen Ernährung bleibt dein Hamster gesund und aktiv!
    `,
    affiliateProducts: []
  },
  {
    id: 6,
    title: "Wellensittich das Sprechen beibringen - Schritt für Schritt",
    excerpt: "Mit Geduld und den richtigen Techniken kann fast jeder Wellensittich sprechen lernen. Hier erfährst du wie es funktioniert.",
    author: "Michael Vogel",
    date: "3. Januar 2024",
    category: "Training",
    image: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 234,
    comments: 19,
    slug: "wellensittich-training-sprechen",
    readTime: "9 min",
    content: `
# Wellensittich das Sprechen beibringen

Wellensittiche sind intelligente Vögel, die mit Geduld und der richtigen Methode sprechen lernen können. Hier ist deine Schritt-für-Schritt Anleitung.

## Grundvoraussetzungen

### Der richtige Zeitpunkt
- Junge Vögel lernen leichter
- Einzelhaltung fördert das Sprechen
- Vertrauen zum Menschen ist wichtig

### Optimale Bedingungen
- Ruhige Umgebung
- Feste Trainingszeiten
- Positive Verstärkung

## Schritt-für-Schritt Anleitung

### 1. Vertrauen aufbauen
- Täglich mit dem Vogel sprechen
- Ruhige, freundliche Stimme
- Geduld haben

### 2. Erste Worte wählen
- Einfache, kurze Worte
- Namen des Vogels
- "Hallo" oder "Guten Morgen"

### 3. Regelmäßiges Training
- 10-15 Minuten täglich
- Immer zur gleichen Zeit
- Wiederholung ist der Schlüssel

### 4. Belohnung
- Lob und Aufmerksamkeit
- Lieblingsleckerli
- Niemals bestrafen

## Häufige Fehler

### Was vermeiden?
- Zu laute oder hektische Stimme
- Unregelmäßiges Training
- Zu viele Worte auf einmal
- Ungeduld

## Fortgeschrittene Techniken

### Melodien und Pfiffe
- Einfache Melodien vorsingen
- Pfiffe sind oft einfacher
- Rhythmus beachten

### Sätze bilden
- Erst einzelne Worte perfektionieren
- Dann zu kurzen Sätzen übergehen
- Kontext ist wichtig

## Realistische Erwartungen

### Nicht jeder Vogel spricht
- Manche lernen nur pfeifen
- Weibchen sprechen seltener
- Geduld ist entscheidend

Mit Liebe, Geduld und der richtigen Technik kann dein Wellensittich ein echter Plaudertasche werden!
    `,
    affiliateProducts: []
  },
  {
    id: 7,
    title: "Was beachten beim Katzenkauf - Der ultimative Ratgeber",
    excerpt: "Alles was du vor dem Katzenkauf wissen musst. Von der Auswahl bis zur ersten Ausstattung - der komplette Guide für angehende Katzenbesitzer.",
    author: "Dr. Lisa Weber",
    date: "20. Januar 2024",
    category: "Ratgeber",
    image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: 'published',
    likes: 189,
    comments: 24,
    slug: "was-beachten-beim-katzenkauf",
    readTime: "12 min",
    content: `
# Was beachten beim Katzenkauf - Der ultimative Ratgeber

Der Kauf einer Katze ist eine wichtige Entscheidung, die gut durchdacht sein will. Eine Katze wird 12-18 Jahre alt und braucht täglich Aufmerksamkeit, Pflege und Liebe. Hier erfährst du alles, was du vor dem Katzenkauf wissen musst.

## Vor dem Kauf: Die wichtigsten Überlegungen

### Bin ich bereit für eine Katze?
Eine Katze ist kein Spielzeug, sondern ein Lebewesen mit eigenen Bedürfnissen. Frage dich ehrlich:

- Habe ich täglich Zeit für meine Katze?
- Kann ich die Kosten für Futter, Tierarzt und Zubehör tragen?
- Bin ich bereit für 15+ Jahre Verantwortung?
- Haben alle Familienmitglieder Allergien ausgeschlossen?

### Welche Katze passt zu mir?

**Kitten oder erwachsene Katze?**
- **Kitten:** Sehr verspielt, brauchen viel Aufmerksamkeit und Erziehung
- **Erwachsene Katzen:** Charakter ist bereits entwickelt, oft ruhiger

**Rasse oder Mischling?**
- **Rassekatzen:** Vorhersagbare Eigenschaften, oft teurer
- **Mischlinge:** Robuster, günstiger, individuelle Persönlichkeit

## Wo kaufe ich eine Katze?

### Seriöse Quellen
1. **Tierheim/Tierschutz** ⭐ Beste Option
   - Katzen brauchen ein neues Zuhause
   - Meist bereits geimpft und kastriert
   - Günstige Schutzgebühr

2. **Seriöse Züchter**
   - Eingetragene Zucht mit Papieren
   - Gesundheitszeugnisse vorhanden
   - Besichtigung vor Ort möglich

### Warnsignale bei unseriösen Anbietern
- Verkauf ohne Besichtigung
- Sehr junge Kitten (unter 12 Wochen)
- Keine Impfpapiere
- Mehrere Würfe gleichzeitig
- Verkauf an öffentlichen Plätzen

## Die erste Ausstattung

### Grundausstattung Checkliste

**Futter & Trinken:**
- Futter- und Wassernäpfe (Keramik oder Edelstahl)
- Hochwertiges Katzenfutter
- Leckerlis für das Training

**Katzenklo:**
- Katzenklo mit hohem Rand
- Katzenstreu (klumpend)
- Streuschaufel

**Schlaf & Komfort:**
- Katzenbett oder Kuscheldecke
- Kratzbaum oder Kratzbrett
- Transportbox

**Spielzeug:**
- Verschiedene Spielzeuge
- Katzenangel
- Bälle und Mäuse

## Kosten im Überblick

### Einmalige Kosten
- Grundausstattung: 150-300€
- Kastration: 80-150€
- Erstimpfung: 50-80€

### Laufende Kosten (monatlich)
- Futter: 20-40€
- Katzenstreu: 10-15€
- Tierarzt (Rücklage): 20-30€

### Jährliche Kosten
- Impfungen: 50-80€
- Wurmkur: 20-30€
- Unvorhergesehene Tierarztkosten: 200-500€

## Der erste Tag zuhause

### Vorbereitung
- Alle Gefahrenquellen beseitigen
- Giftige Pflanzen entfernen
- Fenster und Balkone sichern
- Ruhigen Rückzugsort einrichten

### Eingewöhnung
- Katze zunächst in einem Raum lassen
- Ruhe und Geduld haben
- Nicht bedrängen oder zwingen
- Futter und Wasser bereitstellen

## Wichtige Termine nach dem Kauf

### Erste Woche
- Tierarzt-Termin zur Gesundheitskontrolle
- Impfstatus überprüfen lassen
- Bei Bedarf Wurmkur

### Erste Monate
- Kastration (wenn noch nicht erfolgt)
- Chip implantieren lassen
- Krankenversicherung abschließen

## Häufige Anfängerfehler

### Was du vermeiden solltest:
- Zu frühe Trennung von der Mutter (vor 12 Wochen)
- Spontankauf ohne Vorbereitung
- Falsche Ernährung
- Keine Kastration
- Fehlende Tierarztbesuche

## Fazit

Eine Katze zu kaufen ist eine wunderbare Entscheidung, die aber gut überlegt sein will. Mit der richtigen Vorbereitung und Ausstattung steht einem glücklichen Zusammenleben nichts im Wege. Denke daran: Eine Katze ist ein Familienmitglied für viele Jahre!

Bei Fragen wende dich gerne an deinen Tierarzt oder erfahrene Katzenbesitzer. Jede Katze ist einzigartig und braucht individuelle Aufmerksamkeit.
    `,
    affiliateProducts: [
      {
        title: "Starter-Set für Katzen",
        description: "Komplette Grundausstattung für neue Katzenbesitzer",
        price: "79,99€",
        originalPrice: "99,99€",
        image: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        url: "https://example.com/katzen-starter-set"
      },
      {
        title: "Premium Kratzbaum",
        description: "Stabiler Kratzbaum mit mehreren Ebenen",
        price: "129,99€",
        image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        url: "https://example.com/premium-kratzbaum"
      },
      {
        title: "Transportbox Premium",
        description: "Sichere und komfortable Transportbox",
        price: "49,99€",
        image: "https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.5,
        url: "https://example.com/transportbox-premium"
      }
    ]
  }
];

// Default animal types
export const defaultAnimalTypes: AnimalType[] = [
  { id: 1, name: 'Katzen', icon: '🐱', color: 'from-purple-600 to-pink-600' },
  { id: 2, name: 'Hunde', icon: '🐕', color: 'from-blue-600 to-indigo-600' },
  { id: 3, name: 'Vögel', icon: '🐦', color: 'from-green-600 to-emerald-600' },
  { id: 4, name: 'Kleintiere', icon: '🐹', color: 'from-yellow-600 to-orange-600' },
  { id: 5, name: 'Reptilien', icon: '🦎', color: 'from-teal-600 to-cyan-600' },
  { id: 6, name: 'Fische', icon: '🐠', color: 'from-cyan-600 to-blue-600' }
];

// Animal types management functions
export const getAnimalTypes = (): AnimalType[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('animalTypes');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing animal types:', error);
      }
    }
  }
  return defaultAnimalTypes;
};

export const saveAnimalTypes = (animalTypes: AnimalType[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('animalTypes', JSON.stringify(animalTypes));
  }
};

// Blog data management functions
export const getBlogPosts = (): BlogPost[] => {
  if (typeof window !== 'undefined') {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Merge with static posts to ensure we have all data
        const allPosts = [...staticBlogPosts];
        
        // Add or update posts from localStorage
        parsedPosts.forEach((storedPost: BlogPost) => {
          const existingIndex = allPosts.findIndex(p => p.id === storedPost.id);
          if (existingIndex >= 0) {
            // Update existing post but keep static content if missing
            allPosts[existingIndex] = {
              ...allPosts[existingIndex],
              ...storedPost,
              content: storedPost.content || allPosts[existingIndex].content
            };
          } else {
            // Add new post
            allPosts.push(storedPost);
          }
        });
        
        return allPosts;
      } catch (error) {
        console.error('Error parsing blog posts from localStorage:', error);
      }
    }
  }
  // Return static posts if no localStorage data
  return staticBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const allPosts = getBlogPosts();
  
  // Check if request comes from admin area
  const isAdminAccess = typeof window !== 'undefined' && 
    (window.location.pathname.includes('/admin') || 
     document.referrer.includes('/admin') ||
     localStorage.getItem('adminAuth') === 'true');
  
  if (isAdminAccess) {
    // Admin can see all posts (including drafts)
    return allPosts.find(post => post.slug === slug) || null;
  } else {
    // Public users only see published posts
    return allPosts.find(post => post.slug === slug && post.status === 'published') || null;
  }
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  if (typeof window !== 'undefined') {
    try {
      // Only save new posts (not static ones) to save space
      const newPosts = posts.filter(post => !staticBlogPosts.find(sp => sp.id === post.id));
      
      const dataToSave = JSON.stringify(newPosts);
      
      localStorage.setItem('blogPosts', dataToSave);
      console.log('✅ Blog posts saved successfully:', newPosts.length, 'new posts');
      
    } catch (error) {
      console.error('Error saving blog posts:', error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('❌ Browser-Speicher ist voll! Für Offline-Tests mit großen Bildern verwende Firefox oder erhöhe das localStorage-Limit in den Browser-Entwicklertools.');
      } else {
        if (error instanceof Error) {
          alert('Fehler beim Speichern: ' + error.message);
        } else {
          alert('Ein unbekannter Fehler ist beim Speichern aufgetreten.');
        }
      }
    }
  }
};
