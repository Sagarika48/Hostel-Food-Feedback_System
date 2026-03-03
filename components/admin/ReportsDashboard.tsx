
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { DayOfWeek, WeeklyMenu, MenuItem } from '../../types';
import { DAYS_OF_WEEK } from '../../constants';

const ReportsDashboard: React.FC = () => {
    const { feedback, menu } = useAppContext();

    const getAllMenuItems = (weeklyMenu: WeeklyMenu): Map<string, string> => {
        const allItems = new Map<string, string>();
        for (const day of Object.values(weeklyMenu)) {
            for (const meal of Object.values(day)) {
                meal.forEach((item: MenuItem) => {
                    if (!allItems.has(item.id)) {
                        allItems.set(item.id, item.name);
                    }
                });
            }
        }
        return allItems;
    };
    
    const allMenuItems = useMemo(() => getAllMenuItems(menu), [menu]);

    const overallItemRatings = useMemo(() => {
        if (feedback.length === 0) return [];
        const ratings: { [key: string]: { total: number; count: number } } = {};
        feedback.forEach(fb => {
            fb.items.forEach(item => {
                if (!ratings[item.menuItemId]) {
                    ratings[item.menuItemId] = { total: 0, count: 0 };
                }
                ratings[item.menuItemId].total += item.rating;
                ratings[item.menuItemId].count += 1;
            });
        });

        return Object.entries(ratings)
            .map(([menuItemId, data]) => ({
                name: allMenuItems.get(menuItemId) || 'Unknown Item',
                averageRating: data.total / data.count
            }))
            .sort((a, b) => b.averageRating - a.averageRating);
    }, [feedback, allMenuItems]);

    const dailyAverageRatings = useMemo(() => {
        if (feedback.length === 0) return [];
        const dailyData: { [key: string]: { total: number; count: number } } = {};
        
        feedback.forEach(fb => {
            const day = new Date(fb.date).toLocaleDateString('en-CA');
            if (!dailyData[day]) {
                dailyData[day] = { total: 0, count: 0 };
            }
            fb.items.forEach(item => {
                dailyData[day].total += item.rating;
                dailyData[day].count += 1;
            });
        });

        return Object.entries(dailyData)
            .map(([date, data]) => ({
                date,
                averageRating: data.total / data.count,
            }))
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-10); // Show last 10 days
    }, [feedback]);
    
    const mealTypeDistribution = useMemo(() => {
        const counts = { breakfast: 0, lunch: 0, dinner: 0 };
        feedback.forEach(fb => {
            counts[fb.meal]++;
        });
        return [
            { name: 'Breakfast', value: counts.breakfast },
            { name: 'Lunch', value: counts.lunch },
            { name: 'Dinner', value: counts.dinner },
        ];
    }, [feedback]);
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Feedback Reports</h2>
            {feedback.length === 0 ? (
                <Card>
                    <p className="text-center text-gray-500 py-12">No feedback data available to generate reports.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-xl font-semibold mb-4">Top Rated Items</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={overallItemRatings.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 5]} />
                                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="averageRating" fill="#8884d8" name="Avg. Rating"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card>
                        <h3 className="text-xl font-semibold mb-4">Lowest Rated Items</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={overallItemRatings.slice(-5).reverse()} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 5]} />
                                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="averageRating" fill="#d88484" name="Avg. Rating"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Daily Average Rating (Last 10 Days)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyAverageRatings}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="averageRating" fill="#82ca9d" name="Avg. Rating"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                     <Card>
                        <h3 className="text-xl font-semibold mb-4">Feedback Count by Meal</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={mealTypeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {mealTypeDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ReportsDashboard;
