import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    message: "",
    scheduleEnabled: false,
    scheduleDate: "",
    priority: "normal",
    sendLimit: "unlimited",
  });

  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);

  const userGroups = [
    {
      id: "1",
      name: "VIP клиенты",
      count: 1250,
      tags: ["vip", "premium", "loyalty"],
    },
    {
      id: "2",
      name: "Новые пользователи",
      count: 890,
      tags: ["new", "onboarding", "welcome"],
    },
    {
      id: "3",
      name: "Активные покупатели",
      count: 2140,
      tags: ["active", "buyers", "frequent"],
    },
    {
      id: "4",
      name: "Неактивные пользователи",
      count: 567,
      tags: ["inactive", "retention"],
    },
  ];

  const allTags = [...new Set(userGroups.flatMap((group) => group.tags))];

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const getFilteredGroups = () => {
    if (selectedTags.length === 0) return userGroups;
    return userGroups.filter((group) =>
      selectedTags.some((tag) => group.tags.includes(tag)),
    );
  };

  const totalRecipients =
    selectedGroups.length > 0
      ? userGroups
          .filter((group) => selectedGroups.includes(group.id))
          .reduce((sum, group) => sum + group.count, 0)
      : getFilteredGroups().reduce((sum, group) => sum + group.count, 0);

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Имитация запуска рассылки
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLaunching(false);
    alert("Рассылка успешно запущена!");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Блок 1: Создание рассылки */}
      <Card className="xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Edit" size={20} />
            Создание рассылки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Название рассылки</Label>
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
              className="min-h-[150px] resize-none"
              value={campaignData.message}
              onChange={(e) =>
                setCampaignData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
            />
            <div className="text-xs text-gray-500 mt-1">
              {campaignData.message.length}/1000 символов
            </div>
          </div>

          <div>
            <Label htmlFor="image">Прикрепить изображение</Label>
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
                {uploadedImage
                  ? "Изменить изображение"
                  : "Загрузить изображение"}
              </Button>
              {uploadedImage && (
                <div className="mt-3 relative">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-sm">Настройки рассылки</h3>

            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select
                value={campaignData.priority}
                onValueChange={(value) =>
                  setCampaignData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="normal">Обычный</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Блок 2: Выбор группы пользователей */}
      <Card className="xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Выбор получателей
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Фильтр по тегам
            </Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Группы пользователей</Label>
            {getFilteredGroups().map((group) => (
              <div
                key={group.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedGroups.includes(group.id)
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleGroup(group.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{group.name}</h3>
                  <span className="text-xs text-gray-500">
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
          </div>

          {(selectedGroups.length > 0 || selectedTags.length > 0) && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  Получателей: {totalRecipients.toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedGroups([]);
                    setSelectedTags([]);
                  }}
                >
                  Очистить
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Блок 3: Запуск рассылки */}
      <Card className="xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Send" size={20} />
            Запуск рассылки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-3 text-sm">Превью рассылки</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Название:</span>
                <span className="font-medium">
                  {campaignData.title || "Не указано"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Получателей:</span>
                <span className="font-medium">
                  {totalRecipients.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Приоритет:</span>
                <Badge variant="outline" className="text-xs">
                  {campaignData.priority === "high"
                    ? "Высокий"
                    : campaignData.priority === "low"
                      ? "Низкий"
                      : "Обычный"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Отправка:</span>
                <span className="font-medium">
                  {campaignData.scheduleEnabled ? "Отложенная" : "Немедленно"}
                </span>
              </div>
            </div>
          </div>

          {campaignData.message && (
            <div className="p-3 border rounded-lg bg-white">
              <p className="text-xs text-gray-500 mb-2">Предпросмотр:</p>
              <p className="text-sm leading-relaxed">
                {campaignData.message.length > 120
                  ? campaignData.message.slice(0, 120) + "..."
                  : campaignData.message}
              </p>
              {uploadedImage && (
                <div className="mt-2">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          )}

          {isLaunching && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="text-sm font-medium">Запуск рассылки...</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}

          <div className="space-y-2">
            <Button
              className="w-full"
              disabled={
                !campaignData.title ||
                !campaignData.message ||
                totalRecipients === 0 ||
                isLaunching
              }
              onClick={handleLaunch}
            >
              <Icon name="Send" size={16} className="mr-2" />
              {campaignData.scheduleEnabled
                ? "Запланировать отправку"
                : "Отправить сейчас"}
            </Button>

            <Button variant="outline" className="w-full" disabled={isLaunching}>
              <Icon name="Eye" size={16} className="mr-2" />
              Тестовая отправка
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>💡 Рекомендуем сначала отправить тестовое сообщение</p>
            <p>
              🚀 Массовая отправка займет около{" "}
              {Math.ceil(totalRecipients / 1000)} мин
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
