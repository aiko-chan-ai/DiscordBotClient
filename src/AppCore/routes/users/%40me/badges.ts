/* Copyright Elysia © 2025. All rights reserved */

import { Router } from "express";

const app = Router({ mergeParams: true });

app.get("/", (req, res) => {
    res.send({
        badges: [
            {
                badge_id: 22,
                name: "Discord Staff",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/ba692509432a91ed75d9460662b05c44a5fefb565566fa7df7698597a75f03ee.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 1,
                name: "Nitro",
                description: "Stay subscribed to Nitro to level up this badge.",
                leveling_instructions: "Unlock more levels the longer you have Nitro.",
                info_label: "Subscriber since 4/29/26",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/8adb5e57de66f9e2bf9b764fb973a47fb3552466f0c32ed73b0f503c286abd98.svg",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/6ecb8ab48a8abb284c3392dd956f8809fefca5f78c00e672454c16292051d576.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/6fdeb3399fcded8ab71eb6e4940e8de94e653edf21edb74edd9899354919625d.svg",
                complex_icon_animated_url:
                    "https://cdn.discordapp.com/assets/content/1518ef16d0790bcc0d2a409db2e71a25d7b8726703150612a9b06b45219f4066.png",
                is_earnable: false,
                owned: false,
                hidden: false,
                obtained_at: null,
                current_tier: null,
                next_tier: null,
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "starter",
                        name: "Starter",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/f61ddf640d11d9bdfaf9de265eb862edf28986b659e545f293b54adf229433af.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/835f1fbfc62861a12021328aeb953e68b205383e57c477a754eecef9237fbaa6.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/a6c7aa95118d579d8a26d16b79cf5761a6fa95d3f4ec24c12907e32223e26a20.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 0,
                                unit: "months",
                            },
                        ],
                        owned: false,
                    },
                    {
                        key: "bronze",
                        name: "Bronze",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/9226534d23ce85818ab0a768771c3083eaaa640c1ae5224b933945f0deefc310.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/05bee0b1bb4a1f9bfd4209f5d3a790b8cc02cecde73256eba3ecea751f1767f9.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/448f4eadeff74512c378c180dcbb686af9c9cd94dc6694d5180d34c7ed05ecc1.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/a0837200c383ca7b9e9b2e91358f6871ce8c7f3dd5ba98bbbb86305a205ac6ac.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 month",
                    },
                    {
                        key: "silver",
                        name: "Silver",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/8b4b79fdb42105846a2f238bf24e64bc7ff7f1c8f5b1f23f33354eaf2be152b8.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/ce00ed106a8f38879901531c00788820327ae1c33fa5a5838d61628f02583765.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/b9a8bbb8b1efc9565d11061402662cc77dda584247d873d2302021a3253e4d0a.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/e97f6077a973b27a4abe03c0c3b0a52cb597beb6a048e84963e66ccd7c5b3f09.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 3,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "3 months",
                    },
                    {
                        key: "gold",
                        name: "Gold",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/8adb5e57de66f9e2bf9b764fb973a47fb3552466f0c32ed73b0f503c286abd98.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/6ecb8ab48a8abb284c3392dd956f8809fefca5f78c00e672454c16292051d576.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/6fdeb3399fcded8ab71eb6e4940e8de94e653edf21edb74edd9899354919625d.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/1518ef16d0790bcc0d2a409db2e71a25d7b8726703150612a9b06b45219f4066.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 6,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "6 months",
                    },
                    {
                        key: "platinum",
                        name: "Platinum",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/79b503085598b92dba50758bca96744efd6255155eadf85a53f3b96e80cf1884.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/8506db9c753ce9205cccbfcc17c1a60d2ad517eec52dc6d4ae3bb5eec5233db6.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/c26c5facef36a5cb3be583f1fc127e9c02e91f4c765ae6070e91259a8c245bb3.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/cc06a548690262c78f8389f6efec9c70bad9f9ab42062b796da90639e98a0f92.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 12,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 year",
                    },
                    {
                        key: "diamond",
                        name: "Diamond",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/75f77bbb354870ee41d9dd0973994e4f143fe429e418695c05e1530902b61dd5.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/4f8a09a0cb53da23542326685cd8786e989e654362edf844bfeb970f3da1aa00.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/4532350c490989a448d09aab87c54924c6e7096acd5402feaf23984f75f3b6ee.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/5c8d9feecf9b0160e9eeb1081c10be271ad7a7df3c47e1b0b8b99af02288f9bc.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 24,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "2 years",
                    },
                    {
                        key: "emerald",
                        name: "Emerald",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/1619408cf7b7dba0a006701e4bc6e407e6b39de092c5b77f6f9f78e94de78bf4.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/397d0f42ea7745d64690105c939008f0b53c02d4d8b4bee1447c525d459db93f.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/9dda0fda371344b6d84248839a6acadd86a4749586f64056a58825b9dde24375.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/46e8d5a4a45dad7f45c494188397d3f59efc3a382f276cc5aee2eb404dbe10f1.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 36,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "3 years",
                    },
                    {
                        key: "ruby",
                        name: "Ruby",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/21a7703be2d8407380960daa610d47299f4aeab889a1d1a615886771f669fa8a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/615b989f8ef87e4f13521e9a78a23d2687ac9bba8a3a496d6c645002df94869b.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/52b82fb00416531c5cf9840843f67c4ec2e1fd3318b03e61cc272167cab9a156.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/68f1ae1d703c96eb430767dfffe4357aeace5c503fe89fa03ea73e1c313f8cab.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 60,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "5 years",
                    },
                    {
                        key: "opal",
                        name: "Opal",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/6aa7b974e34694c46a1cdfff1778d4f033a6eb4ea1a000bc22d11860d3ed3215.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/0ea657f714e23f68c889d023035f9ea16ddf59acef5800ab95f041505aa7158d.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/83549e3a5ac2555d3b2d0f9d2015bd11f144549464c3af0943c617617ee1bbff.svg",
                        complex_icon_animated_url:
                            "https://cdn.discordapp.com/assets/content/c58e6f71e0d8336956b188961d65e7431eb3a2c2edc4709273ef9804a85343a5.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 72,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "6+ years",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 187,
                        floor: 183,
                        threshold: 365,
                        unit: "days",
                        window: null,
                        progress_helper_text: "6 more months",
                    },
                ],
            },
            {
                badge_id: 12,
                name: "Server Boosting",
                description: "Keep Server Boosting to level up this badge.",
                leveling_instructions: "Unlock more levels the longer you Boost a server.",
                info_label: "Boosting since 7/23/26",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/d6b9cad8a896ff89b834285bc27ac197e5bfb1bb1b45d4f607c08fb8af0abd1d.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png",
                is_earnable: false,
                owned: false,
                hidden: false,
                obtained_at: null,
                current_tier: null,
                next_tier: null,
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "level_1",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/de982c9d8a5d862b47fd34de3020987698cb775d19603bc137a2372eda321c4c.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 month",
                    },
                    {
                        key: "level_2",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/f5724adb38a17acf45a80d51b7f9f19a3b00b269029fd1830809d458fa86701e.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "2 months",
                    },
                    {
                        key: "level_3",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/d6b9cad8a896ff89b834285bc27ac197e5bfb1bb1b45d4f607c08fb8af0abd1d.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 3,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "3 months",
                    },
                    {
                        key: "level_4",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/78dd9e018bbe400d4586d72a546b4959151d4ad3b38a6d31b13f5fad62a2f934.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/df199d2050d3ed4ebf84d64ae83989f8.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 6,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "6 months",
                    },
                    {
                        key: "level_5",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/75ea67339d5ead82c1c7b518aedf7572688dc2dc432f8a5c4de80c59fec98a90.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/996b3e870e8a22ce519b3a50e6bdd52f.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 9,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "9 months",
                    },
                    {
                        key: "level_6",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/42cf2eea604168d5cd79060992a7493768406577e2f49aee28359e75f08f92a2.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/991c9f39ee33d7537d9f408c3e53141e.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 12,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "12 months",
                    },
                    {
                        key: "level_7",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/b5ce61b9457ef246b1c58fee0864c7810234c32b299b545514905a9a97e5218b.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/cb3ae83c15e970e8f3d410bc62cb8b99.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 15,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "15 months",
                    },
                    {
                        key: "level_8",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/9776068ee4e81791aaa7671a6e00f6db34675ddf17ae5548b1ce657e704f9f4b.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/7142225d31238f6387d9f09efaa02759.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 18,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "18 months",
                    },
                    {
                        key: "level_9",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/90ced1c5e3ffa4fbe6cf0dc93bdab44650b55b02a0e61d70badd3f3524e7436c.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 24,
                                unit: "months",
                            },
                        ],
                        owned: false,
                        milestone_text: "24+ months",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 101,
                        floor: 92,
                        threshold: 184,
                        unit: "days",
                        window: null,
                        progress_helper_text: "3 more months",
                    },
                ],
            },
            {
                badge_id: 18,
                name: "Account Age",
                description: "Keep an active Discord account to level up this badge. Time will do the rest.",
                leveling_instructions: "Unlock more levels by keeping your account active.",
                info_label: "6 years, 4 months",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/018ba2a1ebd7321265af6496af5f131d59002c4f90eadcf93d0da023dea486fa.svg",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/4a3f89677b6a5dbcface45d639af5621a9e44a5258b961acc90701b97bb00cba.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/364b2ccf120bbf05d55c7dfdd68f80870f70d3466af8c9d8ed6215848b052e46.svg",
                is_earnable: false,
                owned: false,
                hidden: false,
                obtained_at: null,
                current_tier: null,
                next_tier: null,
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "one_year",
                        name: "Seed",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/465f6cc202c60d0e250f986fa035ed461e275adddbf875106089527a2c16ef2c.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/8da9339b9d405f0194947e607c839b1bd43436211e5bf07fe7f4ce005578e9e4.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/a020845b216d1b7ab5d32a0b65c7f706a87342546d5283b4fb7f7661e6adb5f8.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 year",
                    },
                    {
                        key: "two_years",
                        name: "Sprout",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/2f2f1d83c3abedbbd2346212343e3f45bd215ddd3d97fdf2272f3c3b4ea52dae.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/f12847ebadd9022c3d67e5b31b5f3608e1ff48a222528fb6059e0fd310fc71b7.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/3ff20822dba22989ca46be81b506b0f2ae05f44a95a170d45c762d77368f81f2.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "2 years",
                    },
                    {
                        key: "three_years",
                        name: "Sapling",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/b9f15d9592f7a4fab4f7295e59bbc9cf45cc4787505eafc17e1586e499d4b64a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/dccc28b53d39406e65e76541d6b940b23a9d31ef418100d77d6eb30c4adb9098.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/b816ac430fe6fdb8a0ecf20def1ee54b2a46f202fed002d13b9c917d5deb6fec.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 3,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "3 years",
                    },
                    {
                        key: "four_years",
                        name: "Bud",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/5a8088ae64ce072f086049e862b9c6fb94a34be8c1de85870cebd4a7db0596ff.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/7c0a10981060861722c0216fd6c01a9fd8b10accbd3d6a04dcde275896e82e8b.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/1b97c4b817127ff54ac2247f6503d61dc01a90dfb312035ca5b5a9a94844b3b2.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 4,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "4 years",
                    },
                    {
                        key: "five_years",
                        name: "Blossom",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/6b236652251f52ab8d0183934bbcd2f3246ac531cecb8d86569d24cbdc8eb1f4.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/52c374af536a4621a65503b4350f7459e3d00f3ed4e3b941c3902c0d9af45f4a.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/d6a94d8528bcaf8cf3270833f886acecb5b8836d4b522c940b4378a4cd99fc1c.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "5 years",
                    },
                    {
                        key: "six_years",
                        name: "Redwood",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/018ba2a1ebd7321265af6496af5f131d59002c4f90eadcf93d0da023dea486fa.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/4a3f89677b6a5dbcface45d639af5621a9e44a5258b961acc90701b97bb00cba.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/364b2ccf120bbf05d55c7dfdd68f80870f70d3466af8c9d8ed6215848b052e46.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 6,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "6 years",
                    },
                    {
                        key: "seven_years",
                        name: "Sequoia",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/2a598969188c36a8292855ca82a6acd953b7adab398721a65bfd360f55eed26a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/7c5a1b1ce27181145c7e37bf6ad323353c14e8db201cfa3cb336292ad9a5d03d.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/273839b70572100e40c68611c54463f9f45114b7a89249b96c7a4bfcc8327905.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 7,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "7 years",
                    },
                    {
                        key: "eight_years",
                        name: "Bristlecone",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/5dc6789b3102d1d63b3a4e257bc0067555702116f392d54cd3f83c0c137e6e11.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/53b3a2b4307df9dfc05a4c9da977baa4a6fd822f5a3d24843f949d1c93398322.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/528f91735db7fd50ed9c95b65044f911663d8941379314d01c27b8fb230fb126.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 8,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "8 years",
                    },
                    {
                        key: "nine_years",
                        name: "Stromatolite",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/3251cbd59d4b048fc5ea83890cfb78fe2e092865ebbf8eff61dcd861af4b5fc7.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/d30993594816cc6035041941291dc7a5862e55676ce85eef91f89fd0c59f2931.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/656dc3ca202956008e14cd1d3224f11674b372f670ffb45e22f395a48a4730e4.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 9,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "9 years",
                    },
                    {
                        key: "ten_years",
                        name: "Primordial",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/895ded0aa669176a4c45b41f18f992ea1a762a57d99edab380377162d54851e5.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/1930d04a8a1d0aba6f97b19b7e7b87158ab154ebffd5468d6ada66671285968b.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/578e40321b1d048d8f6ee125f933c993d9ad52fb0518816d3e5302ec495973a0.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 10,
                                unit: "years",
                            },
                        ],
                        owned: false,
                        milestone_text: "10+ years",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 2331,
                        floor: 2191,
                        threshold: 2556,
                        unit: "days",
                        window: null,
                        progress_helper_text: "7 more months",
                    },
                ],
            },
            {
                badge_id: 17,
                name: "Gifting",
                description: "Unlocked by sending gifts to others.",
                leveling_instructions: "Unlock more levels by sending more gifts.",
                info_label: "2 gifts given",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/ac865fd339fbaa75d77278cd695936f168cd9b88dbbd72fdaeb76174bc0039d3.png",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/ac865fd339fbaa75d77278cd695936f168cd9b88dbbd72fdaeb76174bc0039d3.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/101d1f232a0b465978b0607e2258fbc711806858ab8255b893b164652c8533c1.png",
                is_earnable: false,
                owned: false,
                hidden: false,
                obtained_at: null,
                current_tier: null,
                next_tier: null,
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "1495878284498440192",
                        name: "Patron",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/5a2c578f82445956549c6454a2d65f8ba35b53f59120a4aa55855098ce5a653d.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/5a2c578f82445956549c6454a2d65f8ba35b53f59120a4aa55855098ce5a653d.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/b88750c7565c6dc55140754c3de85c45809121217d3aefb842e3999f887e1931.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                            },
                        ],
                        owned: false,
                        milestone_text: "1 gift",
                    },
                    {
                        key: "1495878348587536515",
                        name: "Champion",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/ac865fd339fbaa75d77278cd695936f168cd9b88dbbd72fdaeb76174bc0039d3.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/ac865fd339fbaa75d77278cd695936f168cd9b88dbbd72fdaeb76174bc0039d3.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/101d1f232a0b465978b0607e2258fbc711806858ab8255b893b164652c8533c1.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2,
                            },
                        ],
                        owned: false,
                        milestone_text: "2 gifts",
                    },
                    {
                        key: "1495878394632474785",
                        name: "Luminary",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/35885be90179a2b4cc4e29aaf1285fe561c837f037aa805df40e921fd8db4867.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/35885be90179a2b4cc4e29aaf1285fe561c837f037aa805df40e921fd8db4867.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/8b43ae51e2e88a961420044d8c2e30316a7dc0f8c3e50d1ea1d6810bdab69fec.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 3,
                            },
                        ],
                        owned: false,
                        milestone_text: "3 gifts",
                    },
                    {
                        key: "1495878436579840091",
                        name: "Icon",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/70b46c1ea400bc57e2d5ac937c70b7ef25599feb1c62d7817c257f19051f1460.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/70b46c1ea400bc57e2d5ac937c70b7ef25599feb1c62d7817c257f19051f1460.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/9c25b98950c3a34c327b5e038ccf117f08ac150338bc39398caac7cef8038e25.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 6,
                            },
                        ],
                        owned: false,
                        milestone_text: "6 gifts",
                    },
                    {
                        key: "1506325197932990504",
                        name: "Hero",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/779d517e251fd2f6c4d64b4bf5839ea20cc5e061a2f971c7811ab2486ccf4553.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/779d517e251fd2f6c4d64b4bf5839ea20cc5e061a2f971c7811ab2486ccf4553.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/ad23878cb00ef0c00e0b7484513f5e1f064b78a6f875dacc549120570f7ec87f.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 10,
                            },
                        ],
                        owned: false,
                        milestone_text: "10 gifts",
                    },
                    {
                        key: "1506325268141314208",
                        name: "Legend",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/eb5ce89c01c7884a614b5be0ebadb0d86215b61b55c04a01d27cffb131b4a070.png",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/eb5ce89c01c7884a614b5be0ebadb0d86215b61b55c04a01d27cffb131b4a070.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/e063f16d36efcebb21c7057160081afb9c564c93b6df629c61e45613886d1aee.png",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 20,
                            },
                        ],
                        owned: false,
                        milestone_text: "20+ gifts",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 2,
                        floor: 2,
                        threshold: 3,
                        unit: null,
                        window: null,
                        progress_helper_text: "1 more gift",
                    },
                ],
            },
            {
                badge_id: 2,
                name: "Discord Partner",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/4c8defb95c334422c34032aa26a8b1703a1be6c3e10e0cec06e8364e85131d6f.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 3,
                name: "Moderator Program Alumni",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/40378bb73aae6b093f7a751fb3d6d5d85886036635c276ffad940818aa7b58ce.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/fee1624003e2fee35cb398e125dc479b.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 4,
                name: "HypeSquad Events",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/b8f8860b6a03f39fd8dd2f37a36e662b3770ee19f8f8b8f8c8e69cd65eceddbd.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 5,
                name: "HypeSquad Bravery",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/fd7e9af07c86b1eb6b623eda13d01a04b6bda0ef1d03296520d7695b2150294a.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 6,
                name: "HypeSquad Brilliance",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/6a5076c27ea8497cef92564a25402b4c359ab9c559cac8b215ff08c08bfec8d0.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 7,
                name: "HypeSquad Balance",
                description: "Unlocked by taking a HypeSquad house quiz and getting sorted into Balance.",
                info_label: "Calm in the chaos",
                rarity: 2,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/a7fe0d95b0b770a896d5812fe9e06e2f71a47f7dd2266a40effae7af2ef88689.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 8,
                name: "Bug Hunter",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/b9165f285d626f147cd6797f77857ad322a4d0727835be43a70a790d1fa3cb4e.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 9,
                name: "Golden Bug Hunter",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/d4dec0be7286ee09653271a872d75c1c8c0d1698b07b66086eeb50f6a82a4532.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 10,
                name: "Early Verified Bot Developer",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/3eb7335bb8cd48c8016dd431ec951edf6ca887aad587d07f5ea60a64ccf283ad.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 11,
                name: "Early Supporter",
                rarity: 5,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/c36ea3c752031ad0ea3bf32743849c0675112fd9e157543aff361c1e512024f5.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 13,
                name: "Legacy Username",
                description: "Unlocked with the release of the username system.",
                info_label: "Elysia#1111",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/3c7a8fe42e29988ea70dcf2046d514895968d53e1581de465d32d822fdf42199.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png",
                is_earnable: false,
                owned: false,
                hidden: true,
            },
            {
                badge_id: 14,
                name: "Quests",
                description: "Unlocked by completing a Quest.",
                info_label: "445 Quests completed",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/efabf8f8c11ca24367db548cf7d80781f6731406d6e2486eba23e3a7d411093e.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 15,
                name: "Last Meadow",
                description: "Unlocked by participating in the 2026 Last Meadow April Fool's Day experience.",
                info_label: "Level 100 Reached",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/8027918b79231a73168d3763fe73bf585e38fcba2b0167c1695194719768e7c3.svg",
                simple_icon_raster_url: "https://cdn.discordapp.com/badge-icons/ca105ad9cfc8580c765101d17bbb2323.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 16,
                name: "Orbs Apprentice",
                description: "Unlocked with Orbs in the Shop.",
                info_label: "This is just the beginning...",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/d899474b7635326e96b66f7c923558af6e21e41c13e18e6c1d402efb434a4098.png",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/d899474b7635326e96b66f7c923558af6e21e41c13e18e6c1d402efb434a4098.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/b0586bc337c189a0ca4e8f3162cc15505c3bee904befe6046a3a83e0dc8e89fd.png",
                is_earnable: false,
                owned: false,
                hidden: false,
            },
            {
                badge_id: 19,
                name: "Streaming",
                description: "Stream to other users for 1 hour to unlock this badge.",
                leveling_instructions: "Unlock more levels by streaming more hours.",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/c56b451e3bf04181182c2529e9bd3659e569ea80f582858090007f0752401b38.svg",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/571a6f607289dfc034d5735ea020bb53f29e9d53dcc54ee852f9f070538ff73a.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/e3bec9e7d48c79f2c7424995592a85f0e103fa51e6a9b151a6d17d611c9027e1.svg",
                is_earnable: false,
                owned: false,
                hidden: false,
                next_tier: "newcomer",
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "newcomer",
                        name: "Newcomer",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/c56b451e3bf04181182c2529e9bd3659e569ea80f582858090007f0752401b38.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/571a6f607289dfc034d5735ea020bb53f29e9d53dcc54ee852f9f070538ff73a.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/e3bec9e7d48c79f2c7424995592a85f0e103fa51e6a9b151a6d17d611c9027e1.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 hour",
                    },
                    {
                        key: "fledgling",
                        name: "Fledgling",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/2e25ba794f6f371ea0f52eb2d3c8fb2b04094a56f388515e13a9bd6d7949a018.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/3e1ec0a72ca812e53ecd53d55c18c2d9765cc89eee08b1e74f7e0bdbfe2e96a2.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/5bc109549867411b404808be65e7ca64d4142fe43dc40c59986244d62f400bea.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "5 hours",
                    },
                    {
                        key: "breakout",
                        name: "Breakout",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/4e847b4dca20fbf1c56d3a47cac3c9204f02113c9d5a270ebebdf12909c75848.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/443707ffced738635bb0ee5c054544c67ec9dfab63b03e661bc1295d5399cac7.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/21b8d249afdf07418623f679c4899f08f8b400b36dee8c0640ce876b0027f81e.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 20,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "20 hours",
                    },
                    {
                        key: "standout",
                        name: "Standout",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/27d0e6939f13dcf113243fc9eac642b15e9764ad891e06c5ed78d45a17678582.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/522de4edcb75e0544633b9ccb55c58d672c4a2fa70a81231bd42bb56cd6555bd.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/29190ed5ba094118c4c3594978e0f5bb92beb55cdb9f0d0bc07d3f47b8377d8d.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 75,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "75 hours",
                    },
                    {
                        key: "trendsetter",
                        name: "Trendsetter",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/af681483be2035f14b0f2bfe2e25a8944c97149172938888ca1008edbe037aad.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/9482ad3a1104986a4cce2979291c733eca0707f6218ddfb6ff36e32e3fd709e9.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/06b69da31f4d7800e1f5e6492912ac3c982f058bef2b63a7f59fec63c91c9a8d.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 150,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "150 hours",
                    },
                    {
                        key: "headliner",
                        name: "Headliner",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/e69a0c86a476c9782ea1d3e7b5ba308eec3d9d6a3eae6ab8af3180f67d16b468.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/2cf2a4ab39800a963efdb900b823dc8ccb23464434f3e11d329851ae566cac22.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/8a996cdb590ba957bad9c3d306844792a1d2bb35552d245f7f9d80879b75df5f.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 300,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "300 hours",
                    },
                    {
                        key: "star",
                        name: "Star",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/06b6206db966635cf626651bdb94eacce5a23ab05dc7f600f7d31aa482b2058c.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/20e0b4ff7fc63681efe95082a69f9bfe7259f1485fa6fa6cebaf709336f42b90.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/54f39ff20bdd89d59288e41909344ef6d7d71f7d45d0b84e91acee34b6e973f3.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 500,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "500 hours",
                    },
                    {
                        key: "sensation",
                        name: "Sensation",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/1a3b9120ecd64c342083c37980b225d29ebf4544da6ab546c9268f87904c9dfe.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/7ceb7fc55dba1fd4c4c5a9acd8345e3b74bca789bf8503445f3bf89109ae47a4.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/47b8840e428a380b1e8da83b4b93cb6ebabc8d1a3582497096c3af3d46b33814.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "1,000 hours",
                    },
                    {
                        key: "visionary",
                        name: "Visionary",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/85f714b90ed3ceb1e00e1f2069bf3ebd564962fa940c92540061537a045e54ab.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/5fbabf24366e08c5f7a56219d7d39f29c41034b5bd091573600f07a904af0035.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/dea662017618e0a6986a9085d75b7a7feac1652f8d3afd63f26accb9e3b72b7f.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "2,000 hours",
                    },
                    {
                        key: "phenomenon",
                        name: "Phenomenon",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/61331d04b7a9542b38bfa59583360c0b9b93c6496a04f99c0ab37fa1d83ec58a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/dd20ac476f0bb7ea9a553abc699c0d6b9854a3f802187e3bf9bf2e45c37a766a.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/ffeacf283c1e7772ae35dc4d9e2ad8be2135a2c75b363d0ef32124f535670508.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "5,000+ hours",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 0,
                        floor: 0,
                        threshold: 1,
                        unit: "hours",
                        window: null,
                        progress_helper_text: "1 more hour",
                    },
                ],
            },
            {
                badge_id: 20,
                name: "Game Time",
                description: "Play 1 hour of detectable PC games with Discord open to unlock this badge.",
                leveling_instructions: "Unlock more levels by playing more hours of games.",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/b75fcc4dd1c65dfd4169a203e21023453fd6fe853c9b5c1fd839781fda98e80d.svg",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/c2844b37da74241525c1001c2ae5dd2719beb0095af8f88dcb35a37ceb0e1892.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/1f9d42f34184814a137e40b0de83e2cac0ae44d83531777b9369d2e2a6ddfeb3.svg",
                is_earnable: false,
                owned: false,
                hidden: false,
                next_tier: "casual",
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "casual",
                        name: "Casual",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/b75fcc4dd1c65dfd4169a203e21023453fd6fe853c9b5c1fd839781fda98e80d.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/c2844b37da74241525c1001c2ae5dd2719beb0095af8f88dcb35a37ceb0e1892.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/1f9d42f34184814a137e40b0de83e2cac0ae44d83531777b9369d2e2a6ddfeb3.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "1 hour",
                    },
                    {
                        key: "recreational",
                        name: "Recreational",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/68b84fae379e1370b3216b3fe1243b6d7c9d9ae631c5f7416d35d20d3ea0fa04.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/157b789531c602542070e680c410d74275e796b6c45cd717292f6d2a59593972.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/451e733482d640fac424b937ec8b27dc62e3426dc937ce35818d262e9bdb57c7.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "5 hours",
                    },
                    {
                        key: "dedicated",
                        name: "Dedicated",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/e0c82f41bcad94a2a52713800fbef7687d0d2c6a6066b09d5e5876156d086e1a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/d6ab0696aae97fca8e6b2b88d4117f09f9ea895d4f0cebee770564369ff06873.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/c12fc54ecf68afdeba97999f5378f93f10e476fb1c87e90a881ec5667e1ff9d1.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 20,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "20 hours",
                    },
                    {
                        key: "committed",
                        name: "Committed",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/8e0ecf91470745aef93dc5b7bdce31b4e43c44632141a3d71da93bd89ca4db2d.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/cc1edd8d955872cd9fbd9bafec80c973287817560d0895587686e3e1671a698e.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/2c1d8204adc7fc888fe13e3a5a0e25884e2ade87a218b0987d07be12d19a719f.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 75,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "75 hours",
                    },
                    {
                        key: "serious",
                        name: "Serious",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/ba26e83fa68189b41837184e38706f41c288dd29ffba266035d1a5ad9adbae22.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/4039caeef586467d50939f3154f87828645d6f1bd699b8f0c1da686b02cefe68.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/470d7a7519c51b46592d18b12f4aa07eaedf156b11ee13d22c81312fae38da1e.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 150,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "150 hours",
                    },
                    {
                        key: "devoted",
                        name: "Devoted",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/851b194288f1913ece6c8d99976519e48210580d6f42d994f21e37801611ad54.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/3d39b6cef7f00fe9e2d51f229034650b900481823af05d09e6537e912de30301.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/f7a892701a5628e95ec74caa814f722e96c4d62a66833de8239290fd2e3bf672.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 300,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "300 hours",
                    },
                    {
                        key: "seasoned",
                        name: "Seasoned",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/8b10f5c0c30abbd521be5afc2e0dd4ec6da18bfbc689f06d93a51d06577cd84a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/46512ce94203c84d7919904acfbd07fc5a8316010a610b8fd6a1cc937e5ac75e.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/76fefae72378b331774887012577c8c942f4846b9bb1d9f58d39e867adf328e3.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 500,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "500 hours",
                    },
                    {
                        key: "ironclad",
                        name: "Ironclad",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/d705628490898f2cc22d669cf8b415bc03fed1ddaf98a2a8cbd97442a509293c.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/9bff716e6bae2ef42dc959bac05a0dfc480bf89484c111ed7fb4aa0332cb22d8.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/d7a2df844cda56877b016e667f2fecead85a65c68a1487d4b2f94300d9d20f71.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 1000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "1,000 hours",
                    },
                    {
                        key: "unshakeable",
                        name: "Unshakeable",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/2bddcbc9f9959dab805eb7196c8112ce9dc68b09766c8193ab499b1870e44ac7.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/1f51d59934543176d8b585c4e5a62d77ca3677c6e26ae4da74b1b639f9091b5e.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/7e51bb1c1a458e2328130a9559787bfc4e2fd47ea14640a6b1662786b0908e00.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "2,000 hours",
                    },
                    {
                        key: "eternal",
                        name: "Eternal",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/457ce4e657f0ced23197891cc3d75b7de29cafa065cdb8cbb81060ac0e63b07f.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/8a62ba720addf7584d3e7f82170104e6a2b35aea4aba5ffc7260cfd706f40c37.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/95fa54ec361bd5b8694f6510e1ac125af51f88dfc628b1a338e96d9aa2bc1d75.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5000,
                                unit: "hours",
                            },
                        ],
                        owned: false,
                        milestone_text: "5,000+ hours",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 0,
                        floor: 0,
                        threshold: 1,
                        unit: "hours",
                        window: null,
                        progress_helper_text: "1 more hour of games",
                    },
                ],
            },
            {
                badge_id: 21,
                name: "Game Variety",
                description: "Play 2 detectable PC games with Discord open to unlock this badge.",
                leveling_instructions: "Unlock more levels by playing more games.",
                rarity: 1,
                simple_icon_url:
                    "https://cdn.discordapp.com/assets/content/ed18d5976c01a4ea19f5a13af08f0547582405cbe48b098b0822e352b8e0a822.svg",
                simple_icon_raster_url:
                    "https://cdn.discordapp.com/assets/content/cbd75cae9bca1c49b35eb0d9c189af4c8604b4f69a1de17ae550db9f03cbd371.png",
                complex_icon_static_url:
                    "https://cdn.discordapp.com/assets/content/796135a2c54b35bc73ba0928b8fb6a9e94be5c97573800ce0a20830b451650b9.svg",
                is_earnable: false,
                owned: false,
                hidden: false,
                next_tier: "sampler",
                tier_obtained_at: {},
                tiers: [
                    {
                        key: "sampler",
                        name: "Sampler",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/ed18d5976c01a4ea19f5a13af08f0547582405cbe48b098b0822e352b8e0a822.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/cbd75cae9bca1c49b35eb0d9c189af4c8604b4f69a1de17ae550db9f03cbd371.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/796135a2c54b35bc73ba0928b8fb6a9e94be5c97573800ce0a20830b451650b9.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 2,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "2 games",
                    },
                    {
                        key: "dabbler",
                        name: "Dabbler",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/e450d5279537db06ee47a104af520b884adaa7ffc3ef2627157526bf1c58e840.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/c9fe2cefaf224c0fb73a5fe11476987930809fa307069deb8bbb2f0b99bac545.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/52915e33648e71ad341026a208d92ddbe09c1811e16fd2d9848bf242f6072de1.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 5,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "5 games",
                    },
                    {
                        key: "enthusiast",
                        name: "Enthusiast",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/158a9d91b8ca9e96d4afeee38cd640fc51483a8196edb9af0c26e44727acafae.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/e016406cec55df228f6e4e7ee9ec5ac10cf0ccd5037c5926da5c26c44e32d374.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/5169b99e09ee3d398f335908d6a5073ed2e5705951362119c55c9b4cafbf9a0a.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 10,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "10 games",
                    },
                    {
                        key: "ranger",
                        name: "Ranger",
                        rarity: 1,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/9e491942070007f64011ae4fc478926b96433698c07621fc43bafdd5efe83912.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/7265bc6f9ff0a47962dafe01b6f9c8f75927392aaf48d48c3619d123d2b584f5.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/5e965ee4ea5f88a2149b33897910afb6f662254204c1136e77fb32b62b78ca82.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 15,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "15 games",
                    },
                    {
                        key: "explorer",
                        name: "Explorer",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/e25fc55814262150e154ddb1a2b55fc5ed8ed5ba2ff1a22a33d4a41e651e370a.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/ffd4938d41c57d27fec0f253a54756c40add56f761c5b1471b531d838e8669db.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/0348e010aebcd3bd63023d5103a33def3fde5eb5d7533d460fb04bcb02d4407a.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 20,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "20 games",
                    },
                    {
                        key: "adventurer",
                        name: "Adventurer",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/542d5277e0001ea738d5eb57b247dcab9ce6e0c29493d5892203f6258fde55b9.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/dcfdce8dfc254b6e8fa9cfba5dcd918f027e27554c3aa2403fe01eb319cf2194.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/17f6b6cf4d586ca2ba01ef6c98e6c795552edf4d155c1547a09abb600c565f72.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 30,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "30 games",
                    },
                    {
                        key: "voyager",
                        name: "Voyager",
                        rarity: 2,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/082e693cb9ce98b81af618978d449409efc6522b061bc0eac6e88a949fd888c6.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/183d6521c3696b0b42f73dd9c319307490982a5dffdc34a923b760d82b20916a.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/ae9edbe4a39da0d66bfc61b378fdccf4f264d644bfc5819c218f67f5bbb93f6f.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 40,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "40 games",
                    },
                    {
                        key: "maverick",
                        name: "Maverick",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/6fc242e9e8259c471a5e4599cd09af5476e622a572ff235883173913bf506103.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/84d4695cdcbb350ad5385c06e87caf06835872135625a8bff6bac300af858412.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/2752ab99ed075e2b6215a86ea09533a8c4e391d4c1ae57babd20152ba3dd77c9.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 60,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "60 games",
                    },
                    {
                        key: "polymath",
                        name: "Polymath",
                        rarity: 3,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/be9a4d119b8e0d7fc1df7e5a12081332637cb9c978a90377cb9c930500b2fbe6.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/1d8d9e3254727d1a1c01b194f2d01ade4525dc8b85c39b877af09768eaf031be.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/b6b290ba9ea06e86c841af0c885703a620e0eafd13178e39b415599e10d38e88.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 80,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "80 games",
                    },
                    {
                        key: "universalist",
                        name: "Universalist",
                        rarity: 5,
                        simple_icon_url:
                            "https://cdn.discordapp.com/assets/content/fcc34d343451505c642f3397cec2669a2de3a4a410fb968f794b3a1a0dcd1728.svg",
                        simple_icon_raster_url:
                            "https://cdn.discordapp.com/assets/content/4731855cd51c1d45fd14dc088b80815ea0562a353b48db369092019fbcb44ec7.png",
                        complex_icon_static_url:
                            "https://cdn.discordapp.com/assets/content/2d2224fbc170bef4ef5cfb2475acdc9a27b86d06f1016919a3269f640b5066b5.svg",
                        requirements: [
                            {
                                progress_type: 1,
                                threshold: 100,
                                unit: "games",
                            },
                        ],
                        owned: false,
                        milestone_text: "100+ games",
                    },
                ],
                progress: [
                    {
                        progress_type: 1,
                        current: 0,
                        floor: 0,
                        threshold: 2,
                        unit: "games",
                        window: null,
                        progress_helper_text: "2 more games",
                    },
                ],
            },
        ],
    });
});

export default app;
