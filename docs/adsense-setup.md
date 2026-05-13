# AdSense Setup

1. Create or open your AdSense account at https://adsense.google.com/start/.
2. Add your deployed PrepMaster domain and wait for Google review.
3. After approval, copy your publisher ID and ad slot IDs into `.env.local`.

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-7697297061831613
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=your-sidebar-slot-id
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=your-inline-slot-id
```

4. Replace `public/ads.txt` with the exact line Google gives you in AdSense.
5. Restart the Next.js server after changing `.env.local`.

Keep ads labeled as `Advertisement`, do not ask users to click ads, and do not click your own ads.
