import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'priest';
  time: string;
}

interface Memorial {
  id: number;
  name: string;
  type: 'health' | 'repose';
  date: string;
}

interface Prayer {
  id: number;
  title: string;
  text: string;
  category: string;
}

interface Livestream {
  id: number;
  title: string;
  status: 'live' | 'scheduled' | 'ended';
  startTime: string;
  viewers?: number;
  thumbnail: string;
}

interface DonationOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  amounts: number[];
}

interface Scripture {
  id: number;
  date: string;
  gospel: {
    reference: string;
    text: string;
  };
  apostle?: {
    reference: string;
    text: string;
  };
}

interface PsalmReading {
  id: number;
  kathisma: number;
  psalms: string;
  text: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [selectedDonationType, setSelectedDonationType] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const [memorialName, setMemorialName] = useState('');
  const [memorialType, setMemorialType] = useState<'health' | 'repose'>('health');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedPsalm, setSelectedPsalm] = useState<number>(1);
  const [isRecurring, setIsRecurring] = useState(false);

  const [messages] = useState<Message[]>([
    { id: 1, text: 'Здравствуйте! Как я могу вам помочь?', sender: 'priest', time: '10:30' },
    { id: 2, text: 'Добрый день, отец. Хотел бы спросить о подаче поминовения', sender: 'user', time: '10:32' },
    { id: 3, text: 'Конечно, с радостью помогу. Что именно вас интересует?', sender: 'priest', time: '10:33' },
  ]);

  const [memorials] = useState<Memorial[]>([
    { id: 1, name: 'Иван', type: 'health', date: '2026-01-15' },
    { id: 2, name: 'Мария', type: 'health', date: '2026-01-15' },
    { id: 3, name: 'Николай †', type: 'repose', date: '2026-01-20' },
  ]);

  const [prayers] = useState<Prayer[]>([
    {
      id: 1,
      title: 'Утренние молитвы',
      text: 'Восстав от сна, прежде всякого другого дела, стань благоговейно, представляя себя пред Всевидящим Богом, и, совершая крестное знамение, произнеси: Во имя Отца, и Сына, и Святаго Духа. Аминь.',
      category: 'Утренние молитвы'
    },
    {
      id: 2,
      title: 'Вечерние молитвы',
      text: 'Господи Боже наш, еже согреших во дне сем словом, делом и помышлением, яко Благ и Человеколюбец прости ми. Мирен сон и безмятежен даруй ми...',
      category: 'Вечерние молитвы'
    },
    {
      id: 3,
      title: 'Последование ко Святому Причащению',
      text: 'Верую, Господи, и исповедую, яко Ты еси воистину Христос, Сын Бога живаго, пришедый в мир грешныя спасти, от нихже первый есмь аз...',
      category: 'Ко Причащению'
    },
    {
      id: 4,
      title: 'Акафист "Слава Богу за все"',
      text: 'Осужден на изгнание, вкусив горечь разлуки, познав унижение и нужду, претерпев неисцелимый недуг, приношу Тебе, Боже мой, хвалу и благодарение: Слава Богу за все!',
      category: 'Акафисты'
    },
    {
      id: 5,
      title: 'Акафист святому великомученику и целителю Пантелеймону',
      text: 'Избранный угодниче Христов и преславный целителю, великомучениче Пантелеймоне! Душею на Небеси Престолу Божию предстояй и триипостасныя Его славы наслаждаяйся...',
      category: 'Акафисты'
    },
    {
      id: 6,
      title: 'Акафист святителю Николаю Чудотворцу',
      text: 'Возбранный Чудотворче и изрядный угодниче Христов, миру всему источаяй многоценное милости миро и неисчерпаемое чудес море, восхваляю тя любовию, святителю Николае...',
      category: 'Акафисты'
    },
    {
      id: 7,
      title: 'Акафист святителю Спиридону Тримифунтскому',
      text: 'Избранный угодниче Божий и предивный чудотворче, скорый помощниче и теплый заступниче, святителю отче Спиридоне! Услыши нас грешных, молящихся тебе...',
      category: 'Акафисты'
    },
    {
      id: 8,
      title: 'Молитва иконе Божией Матери "Домостроительница"',
      text: 'О, Всемилостивая Владычице Богородице, Небеснаго Царя Мати, Домостроительнице наша! Услыши моление наше и даруй нам благословение на всякое дело...',
      category: 'Молитвы иконам'
    },
    {
      id: 9,
      title: 'Молитва иконе Божией Матери "Помощница в родах"',
      text: 'О, Преславная Матерь Божия, помилуй меня, рабу Твою, приими усердное моление мое и умоли Сына Твоего и Бога нашего, даровати мне благополучное разрешение от бремене...',
      category: 'Молитвы иконам'
    },
    {
      id: 10,
      title: 'Молитва о детях',
      text: 'Боже, наш милостивый Небесный Отче! Помилуй наших детей, за которых мы смиренно молим Тебя и которых предаем на Твое попечение и защиту...',
      category: 'Молитвы о близких'
    },
    {
      id: 11,
      title: 'Молитва о болящих',
      text: 'Владыко, Вседержителю, святый Царю, наказуяй и не умерщвляяй, утверждаяй низпадающия и возводяй низверженныя, телесныя человеков скорби исправляяй, молимся Тебе, Боже наш, раба Твоего (имя) немощствующа посети милостию Твоею...',
      category: 'Молитвы о близких'
    },
    {
      id: 12,
      title: 'Молитва о воинах',
      text: 'Господи Иисусе Христе, Боже наш! Буди милость Твоя на воинах наших и на всех, защищающих Отечество наше. Сохрани их под кровом Твоим от всякого зла и сподоби их исполнити заповеди Твоя...',
      category: 'Молитвы о близких'
    },
  ]);

  const [livestreams] = useState<Livestream[]>([
    {
      id: 1,
      title: 'Божественная литургия',
      status: 'live',
      startTime: '9:00',
      viewers: 234,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Вечерняя служба',
      status: 'scheduled',
      startTime: '18:00',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Утренняя молитва',
      status: 'scheduled',
      startTime: 'Завтра в 7:00',
      thumbnail: '/placeholder.svg'
    },
  ]);

  const [donationOptions] = useState<DonationOption[]>([
    {
      id: 1,
      title: 'На храм',
      description: 'Поддержка содержания и развития храма',
      icon: 'Church',
      amounts: [100, 500, 1000, 2000, 5000]
    },
    {
      id: 2,
      title: 'На свечи',
      description: 'Пожертвование на храмовые свечи',
      icon: 'Flame',
      amounts: [50, 100, 200, 500]
    },
    {
      id: 3,
      title: 'На благотворительность',
      description: 'Помощь нуждающимся и социальные программы',
      icon: 'Heart',
      amounts: [200, 500, 1000, 3000]
    },
    {
      id: 4,
      title: 'На иконы',
      description: 'Поддержка иконописной мастерской',
      icon: 'Image',
      amounts: [500, 1000, 2000, 5000]
    },
  ]);

  const handleDonation = () => {
    if (donationAmount) {
      setDonationAmount('');
    }
  };

  const [todayScripture] = useState<Scripture>({
    id: 1,
    date: '11 января 2026',
    gospel: {
      reference: 'От Луки 18:35-43',
      text: 'Когда же подходил Он к Иерихону, один слепой сидел у дороги, прося милостыни, и, услышав, что мимо него проходит народ, спросил: что это такое? Ему сказали, что Иисус Назорей идет. Тогда он закричал: Иисус, Сын Давидов! помилуй меня. Шедшие впереди заграждали его, чтобы молчал; но он еще громче кричал: Сын Давидов! помилуй меня. Иисус, остановившись, велел привести его к Себе: и, когда тот подошел к Нему, спросил его: чего ты хочешь от Меня? Он сказал: Господи! чтобы мне прозреть. Иисус сказал ему: прозри! вера твоя спасла тебя. И он тотчас прозрел и пошел за Ним, славя Бога; и весь народ, видев это, воздал хвалу Богу.'
    },
    apostle: {
      reference: 'К Ефесянам 5:8-19',
      text: 'Вы были некогда тьма, а теперь — свет в Господе: поступайте, как чада света, потому что плод Духа состоит во всякой благости, праведности и истине. Испытывайте, что благоугодно Богу...'
    }
  });

  const [psalmReadings] = useState<PsalmReading[]>([
    {
      id: 1,
      kathisma: 1,
      psalms: 'Псалом 1-8',
      text: 'Блажен муж, иже не иде на совет нечестивых, и на пути грешных не ста, и на седалищи губителей не седе. Но в законе Господни воля его, и в законе Его поучится день и нощь...'
    },
    {
      id: 2,
      kathisma: 2,
      psalms: 'Псалом 9-16',
      text: 'Исповемся Тебе, Господи, всем сердцем моим, повем вся чудеса Твоя. Возвеселюся и возрадуюся о Тебе, пою имени Твоему, Вышний...'
    },
    {
      id: 3,
      kathisma: 3,
      psalms: 'Псалом 17-23',
      text: 'Возлюблю Тя, Господи, крепосте моя. Господь утверждение мое, и прибежище мое, и Избавитель мой...'
    },
    {
      id: 4,
      kathisma: 4,
      psalms: 'Псалом 24-31',
      text: 'К Тебе, Господи, воздвигох душу мою, Боже мой, на Тя уповах, да не постыжуся во век...'
    },
    {
      id: 5,
      kathisma: 5,
      psalms: 'Псалом 32-36',
      text: 'Радуйтеся, праведнии, о Господе, правым подобает похвала. Исповедайтеся Господеви в гуслех...'
    },
  ]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const handleAddMemorial = () => {
    if (memorialName.trim()) {
      setMemorialName('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Church" className="text-accent" size={32} />
            <h1 className="text-2xl font-serif font-bold text-foreground">Духовный путь</h1>
          </div>
          <Avatar>
            <AvatarFallback className="bg-accent text-accent-foreground">ИП</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 h-auto p-1 bg-secondary">
            <TabsTrigger value="chat" className="flex flex-col gap-1 py-3">
              <Icon name="MessageCircle" size={20} />
              <span className="text-xs">Чат</span>
            </TabsTrigger>
            <TabsTrigger value="memorials" className="flex flex-col gap-1 py-3">
              <Icon name="Scroll" size={20} />
              <span className="text-xs">Поминовения</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-col gap-1 py-3">
              <Icon name="Calendar" size={20} />
              <span className="text-xs">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="prayers" className="flex flex-col gap-1 py-3">
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Молитвы</span>
            </TabsTrigger>
            <TabsTrigger value="scripture" className="flex flex-col gap-1 py-3">
              <Icon name="BookMarked" size={20} />
              <span className="text-xs">Евангелие</span>
            </TabsTrigger>
            <TabsTrigger value="livestream" className="flex flex-col gap-1 py-3">
              <Icon name="Video" size={20} />
              <span className="text-xs">Трансляция</span>
            </TabsTrigger>
            <TabsTrigger value="donation" className="flex flex-col gap-1 py-3">
              <Icon name="Heart" size={20} />
              <span className="text-xs">Пожертвование</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex flex-col gap-1 py-3">
              <Icon name="History" size={20} />
              <span className="text-xs">История</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-3">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="animate-fade-in">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b border-border bg-secondary">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-accent text-accent-foreground">О</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-serif font-semibold text-lg">Отец Сергий</h3>
                    <p className="text-sm text-muted-foreground">В сети</p>
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-accent hover:bg-accent/90">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="memorials" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Plus" className="text-accent" size={24} />
                    Подать поминовение
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input
                        placeholder="Введите имя"
                        value={memorialName}
                        onChange={(e) => setMemorialName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Тип поминовения</label>
                      <div className="flex gap-3">
                        <Button
                          variant={memorialType === 'health' ? 'default' : 'outline'}
                          onClick={() => setMemorialType('health')}
                          className="flex-1"
                        >
                          О здравии
                        </Button>
                        <Button
                          variant={memorialType === 'repose' ? 'default' : 'outline'}
                          onClick={() => setMemorialType('repose')}
                          className="flex-1"
                        >
                          Об упокоении
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handleAddMemorial} className="w-full bg-accent hover:bg-accent/90">
                      Подать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl font-semibold mb-4">Мои поминовения</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {memorials.map((memorial) => (
                        <div
                          key={memorial.id}
                          className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              name={memorial.type === 'health' ? 'Heart' : 'Flame'}
                              className="text-accent"
                              size={20}
                            />
                            <div>
                              <p className="font-medium">{memorial.name}</p>
                              <p className="text-xs text-muted-foreground">{memorial.date}</p>
                            </div>
                          </div>
                          <Badge variant={memorial.type === 'health' ? 'default' : 'secondary'}>
                            {memorial.type === 'health' ? 'О здравии' : 'Об упокоении'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Calendar" className="text-accent" size={24} />
                  Календарь молитв и дней памяти
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-semibold mb-3">Предстоящие события</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon name="Bell" className="text-accent mt-1" size={20} />
                          <div>
                            <p className="font-medium">Утренняя молитва</p>
                            <p className="text-sm text-muted-foreground">Сегодня в 7:00</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon name="Flame" className="text-accent mt-1" size={20} />
                          <div>
                            <p className="font-medium">Поминовение Николая</p>
                            <p className="text-sm text-muted-foreground">20 января</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon name="Church" className="text-accent mt-1" size={20} />
                          <div>
                            <p className="font-medium">Крещение Господне</p>
                            <p className="text-sm text-muted-foreground">19 января</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayers" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="BookOpen" className="text-accent" size={24} />
                  Молитвослов
                </h3>
                <div className="space-y-4">
                  {prayers.map((prayer) => (
                    <Card key={prayer.id} className="bg-secondary border-accent/20">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-serif text-xl font-semibold">{prayer.title}</h4>
                          <Badge variant="outline">{prayer.category}</Badge>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          {prayer.text}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Icon name="Heart" size={16} className="mr-2" />
                            В избранное
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Share2" size={16} className="mr-2" />
                            Поделиться
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="History" className="text-accent" size={24} />
                  История активности
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Icon name="MessageCircle" className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Общение с отцом Сергием</p>
                      <p className="text-sm text-muted-foreground">Сегодня в 10:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Icon name="Scroll" className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Подано поминовение о здравии</p>
                      <p className="text-sm text-muted-foreground">Вчера в 15:20</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Icon name="BookOpen" className="text-accent" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Прочитана молитва "Отче наш"</p>
                      <p className="text-sm text-muted-foreground">Вчера в 7:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="livestream" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {isVideoPlaying ? (
                    <div className="relative bg-black aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Icon name="Video" size={64} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Прямая трансляция литургии</p>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm">В эфире • 234 зрителя</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="absolute top-4 right-4 text-white hover:bg-white/20"
                        onClick={() => setIsVideoPlaying(false)}
                      >
                        <Icon name="X" size={24} />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Video" className="text-accent" size={24} />
                        Видеотрансляции богослужений
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {livestreams.map((stream) => (
                          <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Icon name="Church" size={48} className="text-accent opacity-50" />
                              </div>
                              {stream.status === 'live' && (
                                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                                  В ЭФИРЕ
                                </Badge>
                              )}
                              {stream.viewers && (
                                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                  <Icon name="Eye" size={14} />
                                  {stream.viewers}
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-serif text-lg font-semibold mb-2">{stream.title}</h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Icon name="Clock" size={16} />
                                  <span>{stream.startTime}</span>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-accent hover:bg-accent/90"
                                  onClick={() => stream.status === 'live' && setIsVideoPlaying(true)}
                                  disabled={stream.status !== 'live'}
                                >
                                  {stream.status === 'live' ? (
                                    <>
                                      <Icon name="Play" size={16} className="mr-2" />
                                      Смотреть
                                    </>
                                  ) : (
                                    <>
                                      <Icon name="Bell" size={16} className="mr-2" />
                                      Напомнить
                                    </>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-4">Расписание богослужений</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Sun" className="text-accent" size={24} />
                        <div>
                          <p className="font-medium">Утренняя служба</p>
                          <p className="text-sm text-muted-foreground">Ежедневно</p>
                        </div>
                      </div>
                      <span className="font-semibold">7:00</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Church" className="text-accent" size={24} />
                        <div>
                          <p className="font-medium">Божественная литургия</p>
                          <p className="text-sm text-muted-foreground">Воскресенье и праздники</p>
                        </div>
                      </div>
                      <span className="font-semibold">9:00</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Moon" className="text-accent" size={24} />
                        <div>
                          <p className="font-medium">Вечерняя служба</p>
                          <p className="text-sm text-muted-foreground">Ежедневно</p>
                        </div>
                      </div>
                      <span className="font-semibold">18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scripture" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-2xl font-semibold flex items-center gap-2">
                      <Icon name="BookMarked" className="text-accent" size={28} />
                      Евангелие дня
                    </h3>
                    <Badge variant="outline" className="text-sm">{todayScripture.date}</Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card rounded-lg p-6 border border-accent/10">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon name="Cross" className="text-accent" size={20} />
                        <h4 className="font-serif text-xl font-semibold">
                          {todayScripture.gospel.reference}
                        </h4>
                      </div>
                      <p className="text-base leading-relaxed text-foreground">
                        {todayScripture.gospel.text}
                      </p>
                    </div>

                    {todayScripture.apostle && (
                      <div className="bg-card rounded-lg p-6 border border-accent/10">
                        <div className="flex items-center gap-2 mb-4">
                          <Icon name="ScrollText" className="text-accent" size={20} />
                          <h4 className="font-serif text-xl font-semibold">
                            Апостол: {todayScripture.apostle.reference}
                          </h4>
                        </div>
                        <p className="text-base leading-relaxed text-foreground">
                          {todayScripture.apostle.text}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" className="flex-1">
                      <Icon name="Share2" size={18} className="mr-2" />
                      Поделиться
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Volume2" size={18} className="mr-2" />
                      Слушать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Icon name="Book" className="text-accent" size={24} />
                    Чтение Псалтыри
                  </h3>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Выберите кафизму для чтения:
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {psalmReadings.map((reading) => (
                        <Button
                          key={reading.id}
                          variant={selectedPsalm === reading.kathisma ? 'default' : 'outline'}
                          onClick={() => setSelectedPsalm(reading.kathisma)}
                          className="h-auto py-3 flex flex-col gap-1"
                        >
                          <span className="text-xs opacity-70">Кафизма</span>
                          <span className="text-lg font-serif font-semibold">{reading.kathisma}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {psalmReadings
                    .filter((reading) => reading.kathisma === selectedPsalm)
                    .map((reading) => (
                      <div key={reading.id} className="space-y-4">
                        <div className="bg-secondary rounded-lg p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon name="Book" className="text-accent" size={20} />
                            <h4 className="font-serif text-lg font-semibold">
                              Кафизма {reading.kathisma}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{reading.psalms}</p>
                          <p className="text-base leading-relaxed italic">
                            {reading.text}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1">
                            <Icon name="Volume2" size={18} className="mr-2" />
                            Слушать аудио
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Icon name="FileText" size={18} className="mr-2" />
                            Полный текст
                          </Button>
                        </div>
                      </div>
                    ))}

                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" className="text-accent mt-1" size={20} />
                      <div>
                        <p className="font-medium mb-1">О чтении Псалтыри</p>
                        <p className="text-sm text-muted-foreground">
                          Псалтырь разделена на 20 кафизм для удобства ежедневного чтения. 
                          Традиционно верующие прочитывают всю Псалтырь в течение седмицы.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donation" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Icon name="Heart" className="text-accent mx-auto mb-4" size={48} />
                    <h3 className="font-serif text-3xl font-semibold mb-3">
                      Поддержать храм
                    </h3>
                    <p className="text-muted-foreground">
                      Ваше пожертвование помогает поддерживать храм, проводить богослужения и помогать нуждающимся.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 p-4 bg-secondary rounded-lg">
                      <label className="text-sm font-medium cursor-pointer flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isRecurring}
                          onChange={(e) => setIsRecurring(e.target.checked)}
                          className="w-5 h-5 rounded border-accent text-accent focus:ring-accent"
                        />
                        <span>Ежемесячное пожертвование</span>
                      </label>
                      {isRecurring && (
                        <Badge variant="default" className="bg-accent">
                          Каждый месяц
                        </Badge>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block text-center">Выберите сумму</label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant={donationAmount === 100 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(100)}
                          className="h-20 text-lg font-semibold"
                        >
                          100 ₽
                        </Button>
                        <Button
                          variant={donationAmount === 500 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(500)}
                          className="h-20 text-lg font-semibold"
                        >
                          500 ₽
                        </Button>
                        <Button
                          variant={donationAmount === 1000 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(1000)}
                          className="h-20 text-lg font-semibold"
                        >
                          1000 ₽
                        </Button>
                        <Button
                          variant={donationAmount === 2000 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(2000)}
                          className="h-20 text-lg font-semibold"
                        >
                          2000 ₽
                        </Button>
                        <Button
                          variant={donationAmount === 5000 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(5000)}
                          className="h-20 text-lg font-semibold"
                        >
                          5000 ₽
                        </Button>
                        <Button
                          variant={donationAmount === 10000 ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(10000)}
                          className="h-20 text-lg font-semibold"
                        >
                          10000 ₽
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-center">Или введите свою сумму</label>
                      <Input
                        type="number"
                        placeholder="Введите сумму"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="text-center text-lg h-14"
                      />
                    </div>

                    <Button
                      onClick={handleDonation}
                      disabled={!donationAmount}
                      className="w-full bg-accent hover:bg-accent/90 h-16 text-lg"
                    >
                      <Icon name="Heart" size={24} className="mr-3" />
                      {isRecurring ? 'Подписаться' : 'Пожертвовать'} {donationAmount ? `${donationAmount} ₽` : ''}
                      {isRecurring && <span className="ml-2 text-sm opacity-90">/мес</span>}
                    </Button>

                    {isRecurring && (
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="flex items-start gap-3">
                          <Icon name="Info" className="text-accent mt-1" size={20} />
                          <div>
                            <p className="font-medium text-sm mb-1">О регулярных пожертвованиях</p>
                            <p className="text-xs text-muted-foreground">
                              Средства будут списываться автоматически каждый месяц. Вы можете отменить подписку в любое время в разделе «История».
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isRecurring && (
                      <div className="pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center">
                          Пожертвования принимаются добровольно и используются для поддержания храма,<br />
                          проведения богослужений и благотворительных программ.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Icon name="Sparkles" className="text-accent mx-auto mb-3" size={32} />
                    <p className="font-serif text-lg font-semibold mb-2">
                      Спаси Господи всех благодетелей!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      О здравии жертвователей совершается молитва на каждой Божественной литургии
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Icon name="User" className="text-accent" size={24} />
                  Профиль
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                        ИП
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Изменить фото</Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input defaultValue="Иван" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Фамилия</label>
                      <Input defaultValue="Петров" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" defaultValue="ivan.petrov@example.com" />
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-serif text-lg font-semibold mb-3">Настройки уведомлений</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Bell" className="text-accent" size={20} />
                          <span className="text-sm">Время молитв</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Calendar" className="text-accent" size={20} />
                          <span className="text-sm">Дни памяти</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="MessageCircle" className="text-accent" size={20} />
                          <span className="text-sm">Новые сообщения</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90">Сохранить изменения</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;