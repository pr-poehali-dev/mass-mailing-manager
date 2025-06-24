import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const UserGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    {
      id: "1",
      name: "VIP клиенты",
      count: 1250,
      tags: ["vip", "premium", "loyalty"],
      created: "15 янв 2024",
      lastUsed: "2 часа назад",
    },
    {
      id: "2",
      name: "Новые пользователи",
      count: 890,
      tags: ["new", "onboarding", "welcome"],
      created: "10 фев 2024",
      lastUsed: "1 день назад",
    },
    {
      id: "3",
      name: "Активные покупатели",
      count: 2140,
      tags: ["active", "buyers", "frequent"],
      created: "5 мар 2024",
      lastUsed: "3 дня назад",
    },
    {
      id: "4",
      name: "Неактивные пользователи",
      count: 567,
      tags: ["inactive", "retention"],
      created: "20 мар 2024",
      lastUsed: "Никогда",
    },
  ];

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Поиск по группам или тегам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать группу
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">
                  {group.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">пользователей</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>Создана: {group.created}</p>
                <p>Последнее использование: {group.lastUsed}</p>
              </div>

              <Button variant="outline" className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Создать кампанию для группы
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name="Search"
            size={48}
            className="mx-auto text-gray-400 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Группы не найдены
          </h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
};

export default UserGroups;
