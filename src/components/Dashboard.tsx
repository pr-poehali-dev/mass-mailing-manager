import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const stats = [
    {
      title: "Всего отправлено",
      value: "24,890",
      icon: "Send",
      change: "+12%",
    },
    { title: "Открытия", value: "18,234", icon: "Eye", change: "+8%" },
    { title: "Клики", value: "3,456", icon: "MousePointer", change: "+15%" },
    { title: "Активные группы", value: "12", icon: "Users", change: "+2" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon
                name={stat.icon as any}
                size={16}
                className="text-purple-600"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} за месяц</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние кампании</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Скидка 30% на все",
                status: "Доставлено",
                recipients: 5420,
                date: "2 часа назад",
              },
              {
                name: "Новые поступления",
                status: "Отправляется",
                recipients: 3210,
                date: "5 часов назад",
              },
              {
                name: "Персональное предложение",
                status: "Черновик",
                recipients: 0,
                date: "1 день назад",
              },
            ].map((campaign, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">
                    {campaign.recipients} получателей • {campaign.date}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === "Доставлено"
                      ? "bg-green-100 text-green-800"
                      : campaign.status === "Отправляется"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
