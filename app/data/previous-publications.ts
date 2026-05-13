export interface Publication {
  year: number
  author: string
  title: string
  /**
   * Apparatus prose that follows the title (e.g., "mit einem Text von …").
   * Wrap embedded work titles in *asterisks* so they render in italic next
   * to the surrounding roman prose.
   */
  supplement?: string
  note?: string
}

export const previousPublications: Publication[] = [
  { year: 2003, author: 'Heinz Czechowski', title: 'Rückkehr' },
  { year: 2004, author: 'Wulf Kirsten', title: 'Besenginsterland' },
  {
    year: 2005,
    author: 'Lutz Seiler',
    title: 'Vier neue Gedichte',
    supplement:
      'mit einem Text von Wulf Kirsten als eingebundene Beilage des Essays *Die Anrufung*',
  },
  { year: 2006, author: 'Jan Volker Röhnert', title: 'Baltic Times' },
  { year: 2007, author: 'Richard Pietraß', title: 'Wendekreis' },
  {
    year: 2008,
    author: 'Guntram Vesper',
    title: 'Bullenbuch und Mordgeschichte',
  },
  { year: 2009, author: 'Daniela Danz', title: 'Der Schlaf der Bagger' },
  { year: 2011, author: 'Nancy Hünger', title: 'Es flüstert im inneren Ohr' },
  {
    year: 2012,
    author: 'Uwe Grüning',
    title: 'Erinnerung an eine südliche Stadt',
  },
  { year: 2014, author: 'Thomas Kunst', title: 'Silversea' },
  {
    year: 2015,
    author: 'André Schinkel',
    title: 'Hasenberg. Vier Gedichte',
    note: 'Lesung ausgefallen',
  },
  {
    year: 2016,
    author: 'André Schinkel',
    title: 'Hasenberg. Vier Gedichte',
    supplement: 'erweitert um den Einleger *Als ich dich im Traum sah*',
  },
  { year: 2017, author: 'Jan Volker Röhnert', title: 'Die Bienenfresser' },
  { year: 2018, author: 'Michael Krüger', title: 'Mein Europa' },
  { year: 2019, author: 'Richard Pietraß', title: 'Burgfrieden' },
  { year: 2021, author: 'Lutz Seiler', title: 'im knochenpark' },
  { year: 2022, author: 'Christian Rosenau', title: 'Glocken / Helme' },
  { year: 2023, author: 'Thilo Krause', title: 'Streunen' },
  {
    year: 2024,
    author: 'Christian Lehner',
    title: 'Augenblick am kristallinen Meer',
  },
  {
    year: 2025,
    author: 'Romina Nikolić',
    title: 'Litanei der Leichtigkeit, in der du—',
  },
]
