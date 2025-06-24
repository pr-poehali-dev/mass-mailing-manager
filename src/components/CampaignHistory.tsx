import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CampaignHistory = () => {
  const campaigns = [
    {
      id: "1",
      name: "Скидка 30% на все товары",
      status: "Доставлено",
      recipients: 5420,
      opened: 3124,
      clicked: 567,
      date: "24 июня 2025, 14:30",
      type: "Промо",
    },
    {
      id: "2",
      name: "Новые поступления весна-лето",
      status: "Отправляется",
      recipients: 3210,
      opened: 1890,
      clicked: 234,
      date: "24 июня 2025, 10:15",
      type: "Информация",
    },
    {
      id: "3",
      name: "Персональное предложение VIP",
      status: "Завершено",
      recipients: 1250,
      opened: 980,
      clicked: 345,
      date: "23 июня 2025, 16:45",
      type: "VIP",
    },
    {
      id: "4",
      name: "Приглашение на вебинар",
      status: "Ошибка",
      recipients: 0,
      opened: 0,
      clicked: 0,
      date: "23 июня 2025, 12:00",
      type: "Событие",
    },
    {
      id: "5",
      name: "Возврат неактивных клиентов",
      status: "Черновик",
      recipients: 567,
      opened: 0,
      clicked: 0,
      date: "22 июня 2025, 18:20",
      type: "Реактивация",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доставлено":
        return "bg-green-100 text-green-800";
      case "Завершено":
        return "bg-blue-100 text-blue-800";
      case "Отправляется":
        return "bg-yellow-100 text-yellow-800";
      case "Ошибка":
        return "bg-red-100 text-red-800";
      case "Черновик":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Промо":
        return "bg-purple-100 text-purple-800";
      case "VIP":
        return "bg-orange-100 text-orange-800";
      case "Информация":
        return "bg-blue-100 text-blue-800";
      case "Событие":
        return "bg-indigo-100 text-indigo-800";
      case "Реактивация":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">История кампаний</h2>
          <p className="text-gray-600">Все ваши рассылки и их статистика</p>
        </div>
        <Button variant="outline">
          <Icon name="Download" size={16} className="mr-2" />
          Экспорт отчета
        </Button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(campaign.type)}>
                    {campaign.type}
                  </Badge>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.recipients.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Отправлено</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {campaign.opened.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Открыто</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {campaign.clicked.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Кликов</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {campaign.recipients > 0
                      ? Math.round(
                          (campaign.opened / campaign.recipients) * 100,
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-sm text-gray-500">Открываемость</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Icon name="Users" size={16} />
                  <span>
                    CTR:{" "}
                    {campaign.recipients > 0
                      ? (
                          (campaign.clicked / campaign.recipients) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} className="mr-1" />
                    Просмотр
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Copy" size={16} className="mr-1" />
                    Дублировать
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="BarChart3" size={16} className="mr-1" />
                    Детали
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignHistory;
