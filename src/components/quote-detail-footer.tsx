import Image from 'next/image';

export default function QuoteDetailFooter() {
  const agent = {
    name: 'Lucas P. Rodrigues',
    phone: '+61 479 132 985',
    email: 'operations@stbaustralia.com.au',
    avatarUrl: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/fake_porfile_img.jpg',
  };

  const office = {
    addressLine1: 'Level 6 / 225 Clarence St - Sydney - NSW - 2000',
    city: 'Sydney',
  };

  return (
    <footer className="bg-white text-foreground mt-auto">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="border-t-2 border-[#0B0F3A] py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-6">
                        <Image
                            src={agent.avatarUrl}
                            alt={agent.name}
                            width={80}
                            height={80}
                            className="rounded-full w-20 h-20 object-cover"
                        />
                        <div className="text-sm space-y-1">
                            <p className="font-semibold text-base text-foreground">{agent.name}</p>
                            <p className="text-foreground/80">{agent.phone}</p>
                            <p className="text-foreground/80">{agent.email}</p>
                        </div>
                    </div>

                    <div className="text-sm md:text-right space-y-1">
                        <p className="font-bold text-base text-foreground">Contact us</p>
                        <p className="text-foreground/80">{office.addressLine1}</p>
                        <p className="text-foreground/80">{office.city}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
