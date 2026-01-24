import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { fetchHistory, PredictionRecord } from '@/services/historyService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component, or I'll use div
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Calendar, Leaf } from 'lucide-react';
import { format } from 'date-fns';

const HistorySection = () => {
    const [history, setHistory] = useState<PredictionRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUserAndFetch = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const data = await fetchHistory();
                setHistory(data);
            }
            setLoading(false);
        };

        checkUserAndFetch();
    }, []);

    if (loading) return null;
    if (!user) return null; // Don't show if not logged in

    return (
        <section className="py-16 bg-transparent border-t border-border/10">
            <div className="container px-4 mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <History className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold font-heading">Recent Detections</h2>
                </div>

                {history.length === 0 ? (
                    <div className="text-center py-10 bg-secondary/30 rounded-xl border border-dashed border-muted-foreground/20">
                        <p className="text-muted-foreground">No detection history found.</p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {history.map((record) => (
                                <Card key={record.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-border/60 bg-card/50 backdrop-blur-sm">
                                    <div className="flex flex-row">
                                        {/* Image thumbnail if available, or placeholder */}
                                        <div className="w-24 h-24 bg-secondary shrink-0 overflow-hidden relative">
                                            {record.image_url ? (
                                                <img src={record.image_url} alt="Leaf" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Leaf className="text-muted-foreground opacity-20" />
                                                </div>
                                            )}
                                            <div className={`absolute bottom-0 inset-x-0 h-1 ${record.is_healthy ? 'bg-green-500' : 'bg-red-500'}`} />
                                        </div>

                                        <div className="flex-1 p-4 overflow-hidden">
                                            <div className="flex items-start justify-between mb-1">
                                                <h4 className="font-semibold text-sm truncate pr-2" title={record.disease_detected}>
                                                    {record.disease_detected.replace(/_/g, ' ')}
                                                </h4>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${record.is_healthy
                                                    ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                                                    }`}>
                                                    {Math.round(record.confidence)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {format(new Date(record.created_at), 'PPP')}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </section>
    );
};

export default HistorySection;
