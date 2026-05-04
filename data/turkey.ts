// Türkiye İl/İlçe Verisi
// 81 il + bölgesel kampanya bilgisi
// Bölgesel kampanyalar: belirli ilçelerde özel fiyat

export type CampaignZone = 'bolgesel-avantaj' | 'bolgesel-firsat' | 'standart';

export interface City {
  plate: number;          // Plaka kodu
  name: string;           // "Antalya"
  slug: string;           // URL için
  region: string;         // Coğrafi bölge
  districts: string[];    // İlçeler
  campaigns?: {           // İlçe → kampanya zone eşleşmesi
    [district: string]: CampaignZone;
  };
}

// 14 KAPSAMA İL — bölgesel kampanyalı
// Diğer 67 il "standart" kampanya (Fiber Gücü Yaşa)
export const ALL_CITIES: City[] = [
  { plate: 1,  name: 'Adana',          slug: 'adana',          region: 'Akdeniz',     districts: ['Seyhan','Yüreğir','Çukurova','Sarıçam','Ceyhan','İmamoğlu','Karaisalı','Karataş','Kozan','Pozantı','Saimbeyli','Tufanbeyli','Yumurtalık','Aladağ','Feke'] },
  { plate: 2,  name: 'Adıyaman',       slug: 'adiyaman',       region: 'Güneydoğu',   districts: ['Merkez','Besni','Çelikhan','Gerger','Gölbaşı','Kahta','Samsat','Sincik','Tut'] },
  { plate: 3,  name: 'Afyonkarahisar', slug: 'afyon',          region: 'Ege',         districts: ['Merkez','Bolvadin','Çay','Dazkırı','Dinar','Emirdağ','Hocalar','İhsaniye','İscehisar','Kızılören','Sandıklı','Sinanpaşa','Sultandağı','Şuhut','Başmakçı','Bayat','Çobanlar','Evciler'] },
  { plate: 4,  name: 'Ağrı',           slug: 'agri',           region: 'Doğu',        districts: ['Merkez','Diyadin','Doğubayazıt','Eleşkirt','Hamur','Patnos','Taşlıçay','Tutak'] },
  { plate: 5,  name: 'Amasya',         slug: 'amasya',         region: 'Karadeniz',   districts: ['Merkez','Göynücek','Gümüşhacıköy','Hamamözü','Merzifon','Suluova','Taşova'] },
  { plate: 6,  name: 'Ankara',         slug: 'ankara',         region: 'İç Anadolu',  districts: ['Çankaya','Keçiören','Yenimahalle','Mamak','Etimesgut','Sincan','Altındağ','Pursaklar','Gölbaşı','Polatlı','Akyurt','Ayaş','Bala','Beypazarı','Çamlıdere','Çubuk','Elmadağ','Evren','Güdül','Haymana','Kalecik','Kazan','Kızılcahamam','Nallıhan','Şereflikoçhisar'] },
  { plate: 7,  name: 'Antalya',        slug: 'antalya',        region: 'Akdeniz',
    districts: ['Manavgat','Alanya','Kepez','Muratpaşa','Konyaaltı','Aksu','Döşemealtı','Serik','Kemer','Kumluca','Kaş','Finike','Demre','Korkuteli','Elmalı','Gazipaşa','Gündoğmuş','Akseki','İbradı'],
    campaigns: {
      'Manavgat': 'bolgesel-avantaj',
      'Alanya': 'bolgesel-avantaj',
      'Kepez': 'bolgesel-avantaj',
      'Muratpaşa': 'bolgesel-firsat',
    }
  },
  { plate: 8,  name: 'Artvin',         slug: 'artvin',         region: 'Karadeniz',   districts: ['Merkez','Ardanuç','Arhavi','Borçka','Hopa','Murgul','Şavşat','Yusufeli','Kemalpaşa'] },
  { plate: 9,  name: 'Aydın',          slug: 'aydin',          region: 'Ege',         districts: ['Efeler','Bozdoğan','Buharkent','Çine','Didim','Germencik','İncirliova','Karacasu','Karpuzlu','Koçarlı','Köşk','Kuşadası','Kuyucak','Nazilli','Söke','Sultanhisar','Yenipazar'] },
  { plate: 10, name: 'Balıkesir',      slug: 'balikesir',      region: 'Marmara',     districts: ['Altıeylül','Karesi','Ayvalık','Balya','Bandırma','Bigadiç','Burhaniye','Dursunbey','Edremit','Erdek','Gömeç','Gönen','Havran','İvrindi','Kepsut','Manyas','Marmara','Savaştepe','Sındırgı','Susurluk'] },
  { plate: 11, name: 'Bilecik',        slug: 'bilecik',        region: 'Marmara',     districts: ['Merkez','Bozüyük','Gölpazarı','İnhisar','Osmaneli','Pazaryeri','Söğüt','Yenipazar'] },
  { plate: 12, name: 'Bingöl',         slug: 'bingol',         region: 'Doğu',        districts: ['Merkez','Adaklı','Genç','Karlıova','Kiğı','Solhan','Yayladere','Yedisu'] },
  { plate: 13, name: 'Bitlis',         slug: 'bitlis',         region: 'Doğu',        districts: ['Merkez','Adilcevaz','Ahlat','Güroymak','Hizan','Mutki','Tatvan'] },
  { plate: 14, name: 'Bolu',           slug: 'bolu',           region: 'Karadeniz',   districts: ['Merkez','Dörtdivan','Gerede','Göynük','Kıbrıscık','Mengen','Mudurnu','Seben','Yeniçağa'] },
  { plate: 15, name: 'Burdur',         slug: 'burdur',         region: 'Akdeniz',     districts: ['Merkez','Ağlasun','Altınyayla','Bucak','Çavdır','Çeltikçi','Gölhisar','Karamanlı','Kemer','Tefenni','Yeşilova'] },
  { plate: 16, name: 'Bursa',          slug: 'bursa',          region: 'Marmara',     districts: ['Osmangazi','Yıldırım','Nilüfer','Büyükorhan','Gemlik','Gürsu','Harmancık','İnegöl','İznik','Karacabey','Keles','Kestel','Mudanya','Mustafakemalpaşa','Orhaneli','Orhangazi','Yenişehir'] },
  { plate: 17, name: 'Çanakkale',      slug: 'canakkale',      region: 'Marmara',     districts: ['Merkez','Ayvacık','Bayramiç','Biga','Bozcaada','Çan','Eceabat','Ezine','Gelibolu','Gökçeada','Lapseki','Yenice'] },
  { plate: 18, name: 'Çankırı',        slug: 'cankiri',        region: 'İç Anadolu',  districts: ['Merkez','Atkaracalar','Bayramören','Çerkeş','Eldivan','Ilgaz','Kızılırmak','Korgun','Kurşunlu','Orta','Şabanözü','Yapraklı'] },
  { plate: 19, name: 'Çorum',          slug: 'corum',          region: 'Karadeniz',   districts: ['Merkez','Alaca','Bayat','Boğazkale','Dodurga','İskilip','Kargı','Laçin','Mecitözü','Oğuzlar','Ortaköy','Osmancık','Sungurlu','Uğurludağ'] },
  { plate: 20, name: 'Denizli',        slug: 'denizli',        region: 'Ege',         districts: ['Pamukkale','Merkezefendi','Acıpayam','Babadağ','Baklan','Bekilli','Beyağaç','Bozkurt','Buldan','Çal','Çameli','Çardak','Çivril','Güney','Honaz','Kale','Sarayköy','Serinhisar','Tavas'] },
  { plate: 21, name: 'Diyarbakır',     slug: 'diyarbakir',     region: 'Güneydoğu',   districts: ['Bağlar','Kayapınar','Sur','Yenişehir','Bismil','Çermik','Çınar','Çüngüş','Dicle','Eğil','Ergani','Hani','Hazro','Kocaköy','Kulp','Lice','Silvan'] },
  { plate: 22, name: 'Edirne',         slug: 'edirne',         region: 'Marmara',     districts: ['Merkez','Enez','Havsa','İpsala','Keşan','Lalapaşa','Meriç','Süloğlu','Uzunköprü'] },
  { plate: 23, name: 'Elazığ',         slug: 'elazig',         region: 'Doğu',        districts: ['Merkez','Ağın','Alacakaya','Arıcak','Baskil','Karakoçan','Keban','Kovancılar','Maden','Palu','Sivrice'] },
  { plate: 24, name: 'Erzincan',       slug: 'erzincan',       region: 'Doğu',        districts: ['Merkez','Çayırlı','İliç','Kemah','Kemaliye','Otlukbeli','Refahiye','Tercan','Üzümlü'] },
  { plate: 25, name: 'Erzurum',        slug: 'erzurum',        region: 'Doğu',        districts: ['Yakutiye','Palandöken','Aziziye','Aşkale','Çat','Hınıs','Horasan','İspir','Karaçoban','Karayazı','Köprüköy','Narman','Oltu','Olur','Pasinler','Pazaryolu','Şenkaya','Tekman','Tortum','Uzundere'] },
  { plate: 26, name: 'Eskişehir',      slug: 'eskisehir',      region: 'İç Anadolu',  districts: ['Tepebaşı','Odunpazarı','Alpu','Beylikova','Çifteler','Günyüzü','Han','İnönü','Mahmudiye','Mihalgazi','Mihalıççık','Sarıcakaya','Seyitgazi','Sivrihisar'] },
  { plate: 27, name: 'Gaziantep',      slug: 'gaziantep',      region: 'Güneydoğu',   districts: ['Şahinbey','Şehitkamil','Oğuzeli','Araban','İslahiye','Karkamış','Nizip','Nurdağı','Yavuzeli'] },
  { plate: 28, name: 'Giresun',        slug: 'giresun',        region: 'Karadeniz',   districts: ['Merkez','Alucra','Bulancak','Çamoluk','Çanakçı','Dereli','Doğankent','Espiye','Eynesil','Görele','Güce','Keşap','Piraziz','Şebinkarahisar','Tirebolu','Yağlıdere'] },
  { plate: 29, name: 'Gümüşhane',      slug: 'gumushane',      region: 'Karadeniz',   districts: ['Merkez','Kelkit','Köse','Kürtün','Şiran','Torul'] },
  { plate: 30, name: 'Hakkâri',        slug: 'hakkari',        region: 'Doğu',        districts: ['Merkez','Çukurca','Şemdinli','Yüksekova'] },
  { plate: 31, name: 'Hatay',          slug: 'hatay',          region: 'Akdeniz',     districts: ['Antakya','İskenderun','Defne','Samandağ','Altınözü','Arsuz','Belen','Dörtyol','Erzin','Hassa','Kırıkhan','Kumlu','Payas','Reyhanlı','Yayladağı'] },
  { plate: 32, name: 'Isparta',        slug: 'isparta',        region: 'Akdeniz',     districts: ['Merkez','Aksu','Atabey','Eğirdir','Gelendost','Gönen','Keçiborlu','Senirkent','Sütçüler','Şarkikaraağaç','Uluborlu','Yalvaç','Yenişarbademli'] },
  { plate: 33, name: 'Mersin',         slug: 'mersin',         region: 'Akdeniz',     districts: ['Akdeniz','Toroslar','Yenişehir','Mezitli','Tarsus','Anamur','Aydıncık','Bozyazı','Çamlıyayla','Erdemli','Gülnar','Mut','Silifke'] },
  { plate: 34, name: 'İstanbul',       slug: 'istanbul',       region: 'Marmara',     districts: ['Kadıköy','Beşiktaş','Şişli','Üsküdar','Beyoğlu','Bakırköy','Maltepe','Ataşehir','Pendik','Kartal','Sarıyer','Beylikdüzü','Esenyurt','Avcılar','Bağcılar','Bahçelievler','Başakşehir','Bayrampaşa','Beykoz','Çatalca','Çekmeköy','Esenler','Eyüp','Fatih','Gaziosmanpaşa','Güngören','Kâğıthane','Küçükçekmece','Sancaktepe','Silivri','Sultanbeyli','Sultangazi','Şile','Tuzla','Ümraniye','Zeytinburnu','Adalar','Arnavutköy','Büyükçekmece'] },
  { plate: 35, name: 'İzmir',          slug: 'izmir',          region: 'Ege',         districts: ['Konak','Bornova','Karşıyaka','Çiğli','Bayraklı','Buca','Karabağlar','Çeşme','Gaziemir','Aliağa','Balçova','Bayındır','Bergama','Beydağ','Dikili','Foça','Güzelbahçe','Karaburun','Kemalpaşa','Kınık','Kiraz','Menderes','Menemen','Narlıdere','Ödemiş','Seferihisar','Selçuk','Tire','Torbalı','Urla'] },
  { plate: 36, name: 'Kars',           slug: 'kars',           region: 'Doğu',        districts: ['Merkez','Akyaka','Arpaçay','Digor','Kağızman','Sarıkamış','Selim','Susuz'] },
  { plate: 37, name: 'Kastamonu',      slug: 'kastamonu',      region: 'Karadeniz',   districts: ['Merkez','Abana','Ağlı','Araç','Azdavay','Bozkurt','Cide','Çatalzeytin','Daday','Devrekani','Doğanyurt','Hanönü','İhsangazi','İnebolu','Küre','Pınarbaşı','Seydiler','Şenpazar','Taşköprü','Tosya'] },
  { plate: 38, name: 'Kayseri',        slug: 'kayseri',        region: 'İç Anadolu',  districts: ['Melikgazi','Kocasinan','Talas','Akkışla','Bünyan','Develi','Felahiye','Hacılar','İncesu','Özvatan','Pınarbaşı','Sarıoğlan','Sarız','Tomarza','Yahyalı','Yeşilhisar'] },
  { plate: 39, name: 'Kırklareli',     slug: 'kirklareli',     region: 'Marmara',     districts: ['Merkez','Babaeski','Demirköy','Kofçaz','Lüleburgaz','Pehlivanköy','Pınarhisar','Vize'] },
  { plate: 40, name: 'Kırşehir',       slug: 'kirsehir',       region: 'İç Anadolu',  districts: ['Merkez','Akçakent','Akpınar','Boztepe','Çiçekdağı','Kaman','Mucur'] },
  { plate: 41, name: 'Kocaeli',        slug: 'kocaeli',        region: 'Marmara',     districts: ['İzmit','Gebze','Çayırova','Darıca','Körfez','Başiskele','Derince','Dilovası','Gölcük','Kandıra','Kartepe','Karamürsel'] },
  { plate: 42, name: 'Konya',          slug: 'konya',          region: 'İç Anadolu',  districts: ['Selçuklu','Meram','Karatay','Beyşehir','Akören','Akşehir','Altınekin','Beyşehir','Bozkır','Cihanbeyli','Çeltik','Çumra','Derbent','Derebucak','Doğanhisar','Emirgazi','Ereğli','Güneysınır','Hadim','Halkapınar','Hüyük','Ilgın','Kadınhanı','Karapınar','Kulu','Sarayönü','Seydişehir','Taşkent','Tuzlukçu','Yalıhüyük','Yunak'] },
  { plate: 43, name: 'Kütahya',        slug: 'kutahya',        region: 'Ege',         districts: ['Merkez','Altıntaş','Aslanapa','Çavdarhisar','Domaniç','Dumlupınar','Emet','Gediz','Hisarcık','Pazarlar','Şaphane','Simav','Tavşanlı'] },
  { plate: 44, name: 'Malatya',        slug: 'malatya',        region: 'Doğu',        districts: ['Battalgazi','Yeşilyurt','Akçadağ','Arapgir','Arguvan','Darende','Doğanşehir','Doğanyol','Hekimhan','Kale','Kuluncak','Pütürge','Yazıhan'] },
  { plate: 45, name: 'Manisa',         slug: 'manisa',         region: 'Ege',         districts: ['Şehzadeler','Yunusemre','Akhisar','Salihli','Turgutlu','Ahmetli','Alaşehir','Demirci','Gölmarmara','Gördes','Kırkağaç','Köprübaşı','Kula','Sarıgöl','Saruhanlı','Selendi','Soma'] },
  { plate: 46, name: 'Kahramanmaraş',  slug: 'kahramanmaras',  region: 'Akdeniz',     districts: ['Onikişubat','Dulkadiroğlu','Afşin','Andırın','Çağlayancerit','Ekinözü','Elbistan','Göksun','Nurhak','Pazarcık','Türkoğlu'] },
  { plate: 47, name: 'Mardin',         slug: 'mardin',         region: 'Güneydoğu',   districts: ['Artuklu','Dargeçit','Derik','Kızıltepe','Mazıdağı','Midyat','Nusaybin','Ömerli','Savur','Yeşilli'] },
  { plate: 48, name: 'Muğla',          slug: 'mugla',          region: 'Ege',         districts: ['Menteşe','Bodrum','Marmaris','Fethiye','Milas','Datça','Dalaman','Kavaklıdere','Köyceğiz','Ortaca','Seydikemer','Ula','Yatağan'] },
  { plate: 49, name: 'Muş',            slug: 'mus',            region: 'Doğu',        districts: ['Merkez','Bulanık','Hasköy','Korkut','Malazgirt','Varto'] },
  { plate: 50, name: 'Nevşehir',       slug: 'nevsehir',       region: 'İç Anadolu',  districts: ['Merkez','Acıgöl','Avanos','Derinkuyu','Gülşehir','Hacıbektaş','Kozaklı','Ürgüp'] },
  { plate: 51, name: 'Niğde',          slug: 'nigde',          region: 'İç Anadolu',  districts: ['Merkez','Altunhisar','Bor','Çamardı','Çiftlik','Ulukışla'] },
  { plate: 52, name: 'Ordu',           slug: 'ordu',           region: 'Karadeniz',   districts: ['Altınordu','Akkuş','Aybastı','Çamaş','Çatalpınar','Çaybaşı','Fatsa','Gölköy','Gülyalı','Gürgentepe','İkizce','Kabadüz','Kabataş','Korgan','Kumru','Mesudiye','Perşembe','Ulubey','Ünye'] },
  { plate: 53, name: 'Rize',           slug: 'rize',           region: 'Karadeniz',   districts: ['Merkez','Ardeşen','Çamlıhemşin','Çayeli','Derepazarı','Fındıklı','Güneysu','Hemşin','İkizdere','İyidere','Kalkandere','Pazar'] },
  { plate: 54, name: 'Sakarya',        slug: 'sakarya',        region: 'Marmara',     districts: ['Adapazarı','Serdivan','Akyazı','Arifiye','Erenler','Ferizli','Geyve','Hendek','Karapürçek','Karasu','Kaynarca','Kocaali','Pamukova','Sapanca','Söğütlü','Taraklı'] },
  { plate: 55, name: 'Samsun',         slug: 'samsun',         region: 'Karadeniz',   districts: ['İlkadım','Atakum','Canik','Tekkeköy','Alaçam','Asarcık','Ayvacık','Bafra','Çarşamba','Havza','Kavak','Ladik','19 Mayıs','Salıpazarı','Terme','Vezirköprü','Yakakent'] },
  { plate: 56, name: 'Siirt',          slug: 'siirt',          region: 'Güneydoğu',   districts: ['Merkez','Baykan','Eruh','Kurtalan','Pervari','Şirvan','Tillo'] },
  { plate: 57, name: 'Sinop',          slug: 'sinop',          region: 'Karadeniz',   districts: ['Merkez','Ayancık','Boyabat','Dikmen','Durağan','Erfelek','Gerze','Saraydüzü','Türkeli'] },
  { plate: 58, name: 'Sivas',          slug: 'sivas',          region: 'İç Anadolu',  districts: ['Merkez','Akıncılar','Altınyayla','Divriği','Doğanşar','Gemerek','Gölova','Gürün','Hafik','İmranlı','Kangal','Koyulhisar','Suşehri','Şarkışla','Ulaş','Yıldızeli','Zara'] },
  { plate: 59, name: 'Tekirdağ',       slug: 'tekirdag',       region: 'Marmara',     districts: ['Süleymanpaşa','Çorlu','Çerkezköy','Kapaklı','Ergene','Hayrabolu','Malkara','Marmaraereğlisi','Muratlı','Saray','Şarköy'] },
  { plate: 60, name: 'Tokat',          slug: 'tokat',          region: 'Karadeniz',   districts: ['Merkez','Almus','Artova','Başçiftlik','Erbaa','Niksar','Pazar','Reşadiye','Sulusaray','Turhal','Yeşilyurt','Zile'] },
  { plate: 61, name: 'Trabzon',        slug: 'trabzon',        region: 'Karadeniz',   districts: ['Ortahisar','Akçaabat','Yomra','Araklı','Arsin','Beşikdüzü','Çarşıbaşı','Çaykara','Dernekpazarı','Düzköy','Hayrat','Köprübaşı','Maçka','Of','Şalpazarı','Sürmene','Tonya','Vakfıkebir'] },
  { plate: 62, name: 'Tunceli',        slug: 'tunceli',        region: 'Doğu',        districts: ['Merkez','Çemişgezek','Hozat','Mazgirt','Nazımiye','Ovacık','Pertek','Pülümür'] },
  { plate: 63, name: 'Şanlıurfa',      slug: 'sanliurfa',      region: 'Güneydoğu',   districts: ['Haliliye','Eyyübiye','Karaköprü','Siverek','Viranşehir','Akçakale','Birecik','Bozova','Ceylanpınar','Halfeti','Harran','Hilvan','Suruç'] },
  { plate: 64, name: 'Uşak',           slug: 'usak',           region: 'Ege',         districts: ['Merkez','Banaz','Eşme','Karahallı','Sivaslı','Ulubey'] },
  { plate: 65, name: 'Van',            slug: 'van',            region: 'Doğu',        districts: ['İpekyolu','Tuşba','Edremit','Bahçesaray','Başkale','Çaldıran','Çatak','Erciş','Gevaş','Gürpınar','Muradiye','Özalp','Saray'] },
  { plate: 66, name: 'Yozgat',         slug: 'yozgat',         region: 'İç Anadolu',  districts: ['Merkez','Akdağmadeni','Aydıncık','Boğazlıyan','Çandır','Çayıralan','Çekerek','Kadışehri','Saraykent','Sarıkaya','Sorgun','Şefaatli','Yenifakılı','Yerköy'] },
  { plate: 67, name: 'Zonguldak',      slug: 'zonguldak',      region: 'Karadeniz',   districts: ['Merkez','Alaplı','Çaycuma','Devrek','Ereğli','Gökçebey','Kilimli','Kozlu'] },
  { plate: 68, name: 'Aksaray',        slug: 'aksaray',        region: 'İç Anadolu',  districts: ['Merkez','Ağaçören','Eskil','Gülağaç','Güzelyurt','Ortaköy','Sarıyahşi','Sultanhanı'] },
  { plate: 69, name: 'Bayburt',        slug: 'bayburt',        region: 'Karadeniz',   districts: ['Merkez','Aydıntepe','Demirözü'] },
  { plate: 70, name: 'Karaman',        slug: 'karaman',        region: 'İç Anadolu',  districts: ['Merkez','Ayrancı','Başyayla','Ermenek','Kazımkarabekir','Sarıveliler'] },
  { plate: 71, name: 'Kırıkkale',      slug: 'kirikkale',      region: 'İç Anadolu',  districts: ['Merkez','Bahşili','Balışeyh','Çelebi','Delice','Karakeçili','Keskin','Sulakyurt','Yahşihan'] },
  { plate: 72, name: 'Batman',         slug: 'batman',         region: 'Güneydoğu',   districts: ['Merkez','Beşiri','Gercüş','Hasankeyf','Kozluk','Sason'] },
  { plate: 73, name: 'Şırnak',         slug: 'sirnak',         region: 'Güneydoğu',   districts: ['Merkez','Beytüşşebap','Cizre','Güçlükonak','İdil','Silopi','Uludere'] },
  { plate: 74, name: 'Bartın',         slug: 'bartin',         region: 'Karadeniz',   districts: ['Merkez','Amasra','Kurucaşile','Ulus'] },
  { plate: 75, name: 'Ardahan',        slug: 'ardahan',        region: 'Doğu',        districts: ['Merkez','Çıldır','Damal','Göle','Hanak','Posof'] },
  { plate: 76, name: 'Iğdır',          slug: 'igdir',          region: 'Doğu',        districts: ['Merkez','Aralık','Karakoyunlu','Tuzluca'] },
  { plate: 77, name: 'Yalova',         slug: 'yalova',         region: 'Marmara',     districts: ['Merkez','Altınova','Armutlu','Çiftlikköy','Çınarcık','Termal'] },
  { plate: 78, name: 'Karabük',        slug: 'karabuk',        region: 'Karadeniz',   districts: ['Merkez','Eflani','Eskipazar','Ovacık','Safranbolu','Yenice'] },
  { plate: 79, name: 'Kilis',          slug: 'kilis',          region: 'Güneydoğu',   districts: ['Merkez','Elbeyli','Musabeyli','Polateli'] },
  { plate: 80, name: 'Osmaniye',       slug: 'osmaniye',       region: 'Akdeniz',     districts: ['Merkez','Bahçe','Düziçi','Hasanbeyli','Kadirli','Sumbas','Toprakkale'] },
  { plate: 81, name: 'Düzce',          slug: 'duzce',          region: 'Karadeniz',   districts: ['Merkez','Akçakoca','Cumayeri','Çilimli','Gölyaka','Gümüşova','Kaynaşlı','Yığılca'] },
];

// Yardımcı fonksiyonlar
export function findCityByName(name: string): City | undefined {
  if (!name) return undefined;
  const normalized = name.toLowerCase().trim();
  return ALL_CITIES.find(c =>
    c.name.toLowerCase() === normalized ||
    c.slug === normalized
  );
}

export function findCityBySlug(slug: string): City | undefined {
  return ALL_CITIES.find(c => c.slug === slug);
}

export function getDistricts(cityName: string): string[] {
  const city = findCityByName(cityName);
  return city?.districts || [];
}

/**
 * Bir il+ilçe kombinasyonu için kampanya zone'unu döndürür
 * Antalya/Manavgat → 'bolgesel-avantaj'
 * Antalya/Muratpaşa → 'bolgesel-firsat'
 * İstanbul/Kadıköy → 'standart' (Fiber Gücü Yaşa)
 */
export function getCampaignZone(cityName: string, districtName?: string): CampaignZone {
  const city = findCityByName(cityName);
  if (!city || !districtName || !city.campaigns) return 'standart';
  return city.campaigns[districtName] || 'standart';
}

// Geriye dönük uyumluluk (eski kod kullanıyor olabilir)
export const COVERED_CITIES = ALL_CITIES.filter(c => c.campaigns);
export const INTEREST_CITIES: City[] = [];

export function isCovered(_cityName: string): boolean {
  // Yeni mimaride tüm 81 il "covered" (Fiber Gücü Yaşa açık her ilde)
  return true;
}
