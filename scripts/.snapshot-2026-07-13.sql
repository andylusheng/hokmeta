INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lapulapu',
  'lapulapu',
  'Lapulapu',
  '2026-07-13',
  55.27,
  0.37,
  0.02,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'meng-ya',
  'meng-ya',
  'Meng Ya',
  '2026-07-13',
  53.64,
  0.43,
  0.01,
  'B',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dun',
  'dun',
  'Dun',
  '2026-07-13',
  53.55,
  1.74,
  0.35,
  'S',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'garo',
  'garo',
  'Garo',
  '2026-07-13',
  53.55,
  1.25,
  0.21,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'sakeer',
  'sakeer',
  'Sakeer',
  '2026-07-13',
  53.43,
  0.48,
  0.02,
  'B',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'li-xin',
  'li-xin',
  'Li Xin',
  '2026-07-13',
  53.39,
  2.41,
  2.48,
  'S+',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'luban-no-7',
  'luban-no-7',
  'Luban No.7',
  '2026-07-13',
  53.27,
  2.15,
  0.21,
  'S+',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'ying',
  'ying',
  'Ying',
  '2026-07-13',
  53.06,
  0.71,
  0.06,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'athena',
  'athena',
  'Athena',
  '2026-07-13',
  53.03,
  0.06,
  0,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'luara',
  'luara',
  'Luara',
  '2026-07-13',
  53,
  1.32,
  0.13,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'menki',
  'menki',
  'Menki',
  '2026-07-13',
  52.99,
  0.35,
  0.04,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'sima-yi',
  'sima-yi',
  'Sima Yi',
  '2026-07-13',
  52.56,
  0.88,
  0.23,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'ata',
  'ata',
  'Ata',
  '2026-07-13',
  52.56,
  0.51,
  0.04,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lian-po',
  'lian-po',
  'Lian Po',
  '2026-07-13',
  52.27,
  1.08,
  0.13,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'angela',
  'angela',
  'Angela',
  '2026-07-13',
  52.06,
  2.54,
  1.9,
  'S+',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'zilong',
  'zilong',
  'Zilong',
  '2026-07-13',
  52,
  0.84,
  0.02,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'alessio',
  'alessio',
  'Alessio',
  '2026-07-13',
  51.91,
  1.12,
  0.03,
  'A',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'fuzi',
  'fuzi',
  'Fuzi',
  '2026-07-13',
  51.82,
  0.38,
  0.05,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'daji',
  'daji',
  'Daji',
  '2026-07-13',
  51.7,
  2.51,
  2.6,
  'S+',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dian-wei',
  'dian-wei',
  'Dian Wei',
  '2026-07-13',
  51.68,
  1.21,
  0.25,
  'S',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'flowborn-mage',
  'flowborn-mage',
  'Flowborn (Mage)',
  '2026-07-13',
  51.62,
  0.48,
  0.04,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'wang-zhaojun',
  'wang-zhaojun',
  'Wang Zhaojun',
  '2026-07-13',
  51.61,
  1.78,
  0.5,
  'S',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'nuwa',
  'nuwa',
  'Nuwa',
  '2026-07-13',
  51.6,
  0.8,
  0.26,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'agudo',
  'agudo',
  'Agudo',
  '2026-07-13',
  51.58,
  0.38,
  0.02,
  'B',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'li-bai',
  'li-bai',
  'Li Bai',
  '2026-07-13',
  51.57,
  0.51,
  0.15,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'xuance',
  'xuance',
  'Xuance',
  '2026-07-13',
  51.57,
  0.21,
  0.03,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'butterfly',
  'butterfly',
  'Butterfly',
  '2026-07-13',
  51.52,
  0.79,
  0.09,
  'A',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'consort-yu',
  'consort-yu',
  'Consort Yu',
  '2026-07-13',
  51.5,
  1.6,
  0.18,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'flowborn-marksman',
  'flowborn-marksman',
  'Flowborn (Marksman)',
  '2026-07-13',
  51.5,
  0.93,
  0.05,
  'A',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'nezha',
  'nezha',
  'Nezha',
  '2026-07-13',
  51.47,
  0.39,
  0.04,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yixing',
  'yixing',
  'Yixing',
  '2026-07-13',
  51.4,
  0.64,
  0.03,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'arke',
  'arke',
  'Arke',
  '2026-07-13',
  51.37,
  0.54,
  0.61,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'di-renjie',
  'di-renjie',
  'Di Renjie',
  '2026-07-13',
  51.36,
  0.8,
  0.02,
  'A',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'guiguzi',
  'guiguzi',
  'Guiguzi',
  '2026-07-13',
  51.35,
  0.22,
  0.25,
  'B',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'liu-bei',
  'liu-bei',
  'Liu Bei',
  '2026-07-13',
  51.27,
  0.34,
  0.05,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'erin',
  'erin',
  'Erin',
  '2026-07-13',
  51.24,
  1.83,
  0.17,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'garuda',
  'garuda',
  'Garuda',
  '2026-07-13',
  51.16,
  0.8,
  0.03,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'fatih',
  'fatih',
  'Fatih',
  '2026-07-13',
  51.16,
  0.36,
  0.06,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'kaizer',
  'kaizer',
  'Kaizer',
  '2026-07-13',
  51.06,
  1.85,
  0.18,
  'S',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'gao',
  'gao',
  'Gao',
  '2026-07-13',
  51.04,
  0.41,
  0.03,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'bai-qi',
  'bai-qi',
  'Bai Qi',
  '2026-07-13',
  51.01,
  0.36,
  0.04,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'xiang-yu',
  'xiang-yu',
  'Xiang Yu',
  '2026-07-13',
  51,
  0.73,
  0.04,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'wuyan',
  'wuyan',
  'Wuyan',
  '2026-07-13',
  50.98,
  0.33,
  0.02,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'huang-zhong',
  'huang-zhong',
  'Huang Zhong',
  '2026-07-13',
  50.98,
  0.44,
  0.02,
  'B',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'ming',
  'ming',
  'Ming',
  '2026-07-13',
  50.97,
  0.45,
  0.03,
  'B',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'zhou-yu',
  'zhou-yu',
  'Zhou Yu',
  '2026-07-13',
  50.9,
  0.46,
  0.01,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dharma',
  'dharma',
  'Dharma',
  '2026-07-13',
  50.87,
  0.19,
  0.02,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lady-zhen',
  'lady-zhen',
  'Lady Zhen',
  '2026-07-13',
  50.82,
  0.91,
  0.04,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yao',
  'yao',
  'Yao',
  '2026-07-13',
  50.76,
  0.56,
  0.04,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'feyd',
  'feyd',
  'Feyd',
  '2026-07-13',
  50.76,
  0.38,
  0.06,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'mi-yue',
  'mi-yue',
  'Mi Yue',
  '2026-07-13',
  50.71,
  0.82,
  0.61,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'chicha',
  'chicha',
  'Chicha',
  '2026-07-13',
  50.7,
  1.25,
  0.23,
  'S',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'ziya',
  'ziya',
  'Ziya',
  '2026-07-13',
  50.67,
  0.74,
  0.07,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'nakoruru',
  'nakoruru',
  'Nakoruru',
  '2026-07-13',
  50.56,
  0.55,
  0.04,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yang-jian',
  'yang-jian',
  'Yang Jian',
  '2026-07-13',
  50.52,
  0.31,
  0.02,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'cai-yan',
  'cai-yan',
  'Cai Yan',
  '2026-07-13',
  50.51,
  1.13,
  1.45,
  'S',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'florentino',
  'florentino',
  'Florentino',
  '2026-07-13',
  50.46,
  0.61,
  6.32,
  'S+',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'chano',
  'chano',
  'Chano',
  '2026-07-13',
  50.45,
  0.62,
  0.06,
  'B',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'cirrus',
  'cirrus',
  'Cirrus',
  '2026-07-13',
  50.45,
  0.18,
  0.01,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'arthur',
  'arthur',
  'Arthur',
  '2026-07-13',
  50.35,
  1.19,
  0.09,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'liang',
  'liang',
  'Liang',
  '2026-07-13',
  50.28,
  0.72,
  4.84,
  'S+',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'allain',
  'allain',
  'Allain',
  '2026-07-13',
  50.25,
  0.77,
  0.04,
  'A',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dr-bian',
  'dr-bian',
  'Dr Bian',
  '2026-07-13',
  50.19,
  0.53,
  0.07,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'musashi',
  'musashi',
  'Musashi',
  '2026-07-13',
  50.19,
  1.04,
  0.16,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'pei',
  'pei',
  'Pei',
  '2026-07-13',
  50.17,
  0.24,
  0.06,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'kongming',
  'kongming',
  'Kongming',
  '2026-07-13',
  50.09,
  1.37,
  0.2,
  'S',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'shi',
  'shi',
  'Shi',
  '2026-07-13',
  50.06,
  0.72,
  0.32,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lorion',
  'lorion',
  'Lorion',
  '2026-07-13',
  49.99,
  0.69,
  3.64,
  'S+',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'fang',
  'fang',
  'Fang',
  '2026-07-13',
  49.98,
  0.86,
  0.03,
  'A',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'mulan',
  'mulan',
  'Mulan',
  '2026-07-13',
  49.87,
  0.34,
  0.03,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'wukong',
  'wukong',
  'Wukong',
  '2026-07-13',
  49.84,
  1.74,
  0.37,
  'S',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'shouyue',
  'shouyue',
  'Shouyue',
  '2026-07-13',
  49.79,
  0.85,
  0.1,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'ukyo-tachibana',
  'ukyo-tachibana',
  'Ukyo Tachibana',
  '2026-07-13',
  49.76,
  0.39,
  0.02,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'umbrosa',
  'umbrosa',
  'Umbrosa',
  '2026-07-13',
  49.75,
  0.58,
  0.04,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'charlotte',
  'charlotte',
  'Charlotte',
  '2026-07-13',
  49.74,
  0.66,
  0.05,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yuhuan',
  'yuhuan',
  'Yuhuan',
  '2026-07-13',
  49.73,
  0.42,
  0.01,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'mozi',
  'mozi',
  'Mozi',
  '2026-07-13',
  49.66,
  1.26,
  0.83,
  'S',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'kui',
  'kui',
  'Kui',
  '2026-07-13',
  49.63,
  0.82,
  0.34,
  'A',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'augran',
  'augran',
  'Augran',
  '2026-07-13',
  49.48,
  1.35,
  4.84,
  'S+',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'hou-yi',
  'hou-yi',
  'Hou Yi',
  '2026-07-13',
  49.47,
  2.56,
  0.15,
  'S+',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'gan-mo',
  'gan-mo',
  'Gan & Mo',
  '2026-07-13',
  49.43,
  0.47,
  0.09,
  'B',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'zhuangzi',
  'zhuangzi',
  'Zhuangzi',
  '2026-07-13',
  49.42,
  0.65,
  0.9,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'annette',
  'annette',
  'Annette',
  '2026-07-13',
  49.38,
  0.69,
  0.77,
  'A',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'liu-shan',
  'liu-shan',
  'Liu Shan',
  '2026-07-13',
  49.36,
  0.78,
  0.09,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'gao-changgong',
  'gao-changgong',
  'Gao Changgong',
  '2026-07-13',
  49.29,
  0.48,
  0.48,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'zhang-fei',
  'zhang-fei',
  'Zhang Fei',
  '2026-07-13',
  49.13,
  0.78,
  0.21,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'haya',
  'haya',
  'Haya',
  '2026-07-13',
  49.02,
  0.98,
  2.08,
  'S',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'sun-ce',
  'sun-ce',
  'Sun Ce',
  '2026-07-13',
  48.92,
  0.99,
  0.04,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'marco-polo',
  'marco-polo',
  'Marco Polo',
  '2026-07-13',
  48.87,
  1.93,
  0.3,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'liu-bang',
  'liu-bang',
  'Liu Bang',
  '2026-07-13',
  48.78,
  0.23,
  0.01,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lam',
  'lam',
  'Lam',
  '2026-07-13',
  48.78,
  1.3,
  0.6,
  'S',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'sun-bin',
  'sun-bin',
  'Sun Bin',
  '2026-07-13',
  48.63,
  0.33,
  0.03,
  'B',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'flowborn-tank',
  'flowborn-tank',
  'Flowborn (Tank)',
  '2026-07-13',
  48.56,
  0.53,
  0.06,
  'B',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'da-qiao',
  'da-qiao',
  'Da Qiao',
  '2026-07-13',
  48.52,
  0.83,
  0.36,
  'A',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'xiao-qiao',
  'xiao-qiao',
  'Xiao Qiao',
  '2026-07-13',
  48.49,
  1.69,
  0.11,
  'S',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lu-bu',
  'lu-bu',
  'Lu Bu',
  '2026-07-13',
  48.43,
  1.36,
  0.21,
  'S',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'donghuang',
  'donghuang',
  'Donghuang',
  '2026-07-13',
  48.35,
  0.69,
  1.93,
  'S',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'han-xin',
  'han-xin',
  'Han Xin',
  '2026-07-13',
  48.27,
  0.31,
  0.07,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yango',
  'yango',
  'Yango',
  '2026-07-13',
  48.15,
  0.33,
  0.06,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'milady',
  'milady',
  'Milady',
  '2026-07-13',
  48.13,
  1.92,
  1.49,
  'S+',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'shangguan',
  'shangguan',
  'Shangguan',
  '2026-07-13',
  47.86,
  0.48,
  0.06,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'biron',
  'biron',
  'Biron',
  '2026-07-13',
  47.82,
  0.97,
  0.07,
  'A',
  'Tank'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'yaria',
  'yaria',
  'Yaria',
  '2026-07-13',
  47.79,
  1.1,
  1.16,
  'S',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dyadia',
  'dyadia',
  'Dyadia',
  '2026-07-13',
  47.77,
  0.95,
  0.76,
  'S',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'lady-sun',
  'lady-sun',
  'Lady Sun',
  '2026-07-13',
  47.67,
  2.05,
  0.16,
  'S',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'heino',
  'heino',
  'Heino',
  '2026-07-13',
  47.67,
  0.78,
  0.13,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'mai-shiranui',
  'mai-shiranui',
  'Mai Shiranui',
  '2026-07-13',
  47.63,
  0.73,
  0.13,
  'A',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'aoyin',
  'aoyin',
  'Ao''yin',
  '2026-07-13',
  47.63,
  1.5,
  2.88,
  'S+',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'diaochan',
  'diaochan',
  'Diaochan',
  '2026-07-13',
  47.62,
  0.7,
  0.08,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'mayene',
  'mayene',
  'Mayene',
  '2026-07-13',
  47.18,
  0.43,
  0.05,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'guan-yu',
  'guan-yu',
  'Guan Yu',
  '2026-07-13',
  46.55,
  0.37,
  0.09,
  'B',
  'Warrior'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'devara',
  'devara',
  'Devara',
  '2026-07-13',
  46.48,
  1.12,
  0.23,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'arli',
  'arli',
  'Arli',
  '2026-07-13',
  46.32,
  0.69,
  0.26,
  'A',
  'Marksman'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'luna',
  'luna',
  'Luna',
  '2026-07-13',
  45.89,
  0.67,
  0.2,
  'A',
  'Mage'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'dolia',
  'dolia',
  'Dolia',
  '2026-07-13',
  45.76,
  1.74,
  0.4,
  'S',
  'Support'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;
INSERT INTO hero_daily_snapshot (
  hero_id, hero_slug, hero_name, snapshot_date,
  win_rate, pick_rate, ban_rate, tier, role
) VALUES (
  'jing',
  'jing',
  'Jing',
  '2026-07-13',
  45.6,
  0.29,
  0.1,
  'B',
  'Assassin'
)
ON CONFLICT(hero_slug, snapshot_date) DO UPDATE SET
  hero_id = excluded.hero_id,
  hero_name = excluded.hero_name,
  win_rate = excluded.win_rate,
  pick_rate = excluded.pick_rate,
  ban_rate = excluded.ban_rate,
  tier = excluded.tier,
  role = excluded.role;