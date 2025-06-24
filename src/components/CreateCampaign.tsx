import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    message: "",
    scheduleEnabled: false,
    scheduleDate: "",
  });

  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const userGroups = [
    { id: "1", name: "VIP клиенты", count: 1250, tags: ["vip", "premium"] },
    {
      id: "2",
      name: "Новые пользователи",
      count: 890,
      tags: ["new", "onboarding"],
    },
    {
      id: "3",
      name: "Активные покупатели",
      count: 2140,
      tags: ["active", "buyers"],
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const totalRecipients = userGroups
    .filter((group) => selectedGroups.includes(group.id))
    .reduce((sum, group) => sum + group.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Блок 1: Создание кампании */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Edit" size={20} />
            Настройка кампании
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Название кампании</Label>
            <Input
              id="title"
              placeholder="Например: Акция на выходные"
              value={campaignData.title}
              onChange={(e) =>
                setCampaignData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="message">Текст сообщения</Label>
            <Textarea
              id="message"
              placeholder="Привет! У нас для тебя отличное предложение..."
              className="min-h-[120px]"
              value={campaignData.message}
              onChange={(e) =>
                setCampaignData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Label htmlFor="image">Изображение</Label>
            <div className="mt-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full"
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить изображение
              </Button>
              {uploadedImage && (
                <div className="mt-3">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="schedule"
              checked={campaignData.scheduleEnabled}
              onCheckedChange={(checked) =>
                setCampaignData((prev) => ({
                  ...prev,
                  scheduleEnabled: checked,
                }))
              }
            />
            <Label htmlFor="schedule">Отложенная отправка</Label>
          </div>

          {campaignData.scheduleEnabled && (
            <div>
              <Label htmlFor="scheduleDate">Дата и время отправки</Label>
              <Input
                id="scheduleDate"
                type="datetime-local"
                value={campaignData.scheduleDate}
                onChange={(e) =>
                  setCampaignData((prev) => ({
                    ...prev,
                    scheduleDate: e.target.value,
                  }))
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Блок 2: Выбор групп пользователей */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Группы получателей
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userGroups.map((group) => (
            <div
              key={group.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedGroups.includes(group.id)
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{group.name}</h3>
                <span className="text-sm text-gray-500">
                  {group.count.toLocaleString()} чел.
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          {selectedGroups.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Выбрано получателей: {totalRecipients.toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Блок 3: Запуск кампании */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Send" size={20} />
            Запуск кампании
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Превью кампании</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Название:</strong> {campaignData.title || "Не указано"}
              </p>
              <p>
                <strong>Получателей:</strong> {totalRecipients.toLocaleString()}
              </p>
              <p>
                <strong>Время:</strong>{" "}
                {campaignData.scheduleEnabled ? "Отложенная" : "Немедленно"}
              </p>
            </div>
          </div>

          {campaignData.message && (
            <div className="p-3 border rounded-lg bg-white">
              <p className="text-xs text-gray-500 mb-1">
                Предпросмотр сообщения:
              </p>
              <p className="text-sm">{campaignData.message.slice(0, 100)}...</p>
            </div>
          )}

          <div className="space-y-2">
            <Button
              className="w-full"
              disabled={
                !campaignData.title ||
                !campaignData.message ||
                selectedGroups.length === 0
              }
            >
              <Icon name="Send" size={16} className="mr-2" />
              {campaignData.scheduleEnabled
                ? "Запланировать отправку"
                : "Отправить сейчас"}
            </Button>

            <Button variant="outline" className="w-full">
              <Icon name="Eye" size={16} className="mr-2" />
              Тестовая отправка
            </Button>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>
              💡 Совет: Сначала отправьте тест себе, чтобы проверить отображение
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
