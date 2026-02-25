import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";
import { toast } from "sonner";
import { Mail, Phone, Calendar, CheckCircle, Clock } from "lucide-react";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    product: string | null;
    message: string;
    status: 'new' | 'contacted' | 'closed';
    created_at: string;
}

const InquiriesManager = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error("Failed to fetch inquiries");
            console.error(error);
        } else {
            setInquiries(data as Inquiry[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
        const { error } = await (supabase as any)
            .from('inquiries')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success("Status updated!");
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Inquiries Manager</h1>
                    <p className="text-muted-foreground mt-1">Manage and respond to customer inquiries from the website.</p>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card h-32 animate-pulse rounded-xl border border-border/30"></div>
                    ))}
                </div>
            ) : inquiries.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Inquiries Found</h3>
                    <p className="text-muted-foreground">You don't have any inquiries yet. Check back later.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {inquiries.map((inq) => (
                        <div key={inq.id} className="glass-card p-6 rounded-2xl border border-border/50 bg-card/40 flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">{inq.name}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {inq.email}</span>
                                            {inq.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {inq.phone}</span>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {format(new Date(inq.created_at), 'PPP')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 bg-background/50 rounded-xl border border-border/50 text-foreground whitespace-pre-wrap">
                                    <span className="font-semibold text-gold text-sm uppercase mb-2 block tracking-wider">Product: {inq.product || 'General'}</span>
                                    {inq.message}
                                </div>
                            </div>
                            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                                <h4 className="text-sm font-semibold mb-3 text-foreground">Status</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => updateStatus(inq.id, 'new')}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${inq.status === 'new' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> New</span>
                                        {inq.status === 'new' && <CheckCircle className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => updateStatus(inq.id, 'contacted')}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${inq.status === 'contacted' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contacted</span>
                                        {inq.status === 'contacted' && <CheckCircle className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => updateStatus(inq.id, 'closed')}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${inq.status === 'closed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-transparent border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Closed</span>
                                        {inq.status === 'closed' && <CheckCircle className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InquiriesManager;
