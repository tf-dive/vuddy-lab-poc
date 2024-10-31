'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

// Mock data for creators
const creators = [
  { id: 1, name: '여르미', image: '/여르미2.png' },
  { id: 2, name: '한결', image: '/한결2.png' },
  { id: 3, name: '리키', image: '/리키.png' },
  { id: 4, name: '샤르망', image: '/샤르망.png' },
  { id: 5, name: '엘시', image: '/엘시.png' },
  { id: 6, name: '비몽', image: '/비몽.png' },
  { id: 7, name: '따스히', image: '/따스히.png' },
  { id: 8, name: '도도리코', image: '/도도리코.png' },
];

export default function Home() {
  const { toast } = useToast();
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);
  const [notifications, setNotifications] = useState({
    streamStart: false,
    titleChange: false,
    streamEnd: false,
    streamerChat: false,
  });

  const handleSave = () => {
    if (!selectedCreator) {
      toast({
        title: '알림 설정 실패',
        description: '크리에이터를 선택해주세요.',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }
    toast({
      title: '알림이 설정되었습니다',
      description: '디스코드로 알림이 전송됩니다.',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5c6bf6] to-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-[1000px]">
        <CardHeader className="flex flex-row items-center justify-between bg-[#dafe48] rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2 font-extrabold">
            <Bell className="w-5 h-5" />
            알림 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Creators Grid */}
            <div className="space-y-4">
              <h3 className="font-medium font-extrabold">크리에이터 선택</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {creators.map((creator) => (
                  <button
                    key={creator.id}
                    onClick={() => setSelectedCreator(creator.id)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                      selectedCreator === creator.id
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{creator.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium font-extrabold">
                  {selectedCreator
                    ? creators.find((creator) => creator.id === selectedCreator)
                        ?.name
                    : ''}{' '}
                  알림 설정하기
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="streamStart" className="text-sm">
                      방송 시작 알림
                    </label>
                    <Switch
                      id="streamStart"
                      checked={notifications.streamStart}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          streamStart: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="titleChange" className="text-sm">
                      방송 제목 변경 알림
                    </label>
                    <Switch
                      id="titleChange"
                      checked={notifications.titleChange}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          titleChange: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="streamEnd" className="text-sm">
                      방송 종료 알림
                    </label>
                    <Switch
                      id="streamEnd"
                      checked={notifications.streamEnd}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          streamEnd: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="titleChange" className="text-sm">
                      스트리머 채팅 알림
                    </label>
                    <Switch
                      id="titleChange"
                      checked={notifications.streamerChat}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          streamerChat: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} className="w-full md:w-auto">
                  알림 만들기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
