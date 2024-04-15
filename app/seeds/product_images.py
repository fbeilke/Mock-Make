from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    product_images_data = {
        "productImage1" : ProductImage(
            product_id=1,
            url="https://i.etsystatic.com/27162649/r/il/bd9c2b/4021911282/il_1588xN.4021911282_cm8g.jpg",
            preview=True
        ),
        "productImage2" : ProductImage(
            product_id=1,
            url="https://i.etsystatic.com/27162649/r/il/a9178d/4416675240/il_1588xN.4416675240_rkvc.jpg",
            preview=False
        ),
        "productImage3" : ProductImage(
            product_id=1,
            url="https://i.etsystatic.com/27162649/r/il/fc4e51/3966549914/il_1588xN.3966549914_mw8e.jpg",
            preview=False
        ),
        "productImage4" : ProductImage(
            product_id=1,
            url="https://i.etsystatic.com/27162649/r/il/4afed8/3966549900/il_1588xN.3966549900_2tm4.jpg",
            preview=False
        ),
        "productImage5" : ProductImage(
            product_id=1,
            url="https://i.etsystatic.com/27162649/r/il/cfdeae/5859701671/il_1588xN.5859701671_od53.jpg",
            preview=False
        ),
        "productImage6" : ProductImage(
            product_id=2,
            url="https://i.etsystatic.com/28753344/r/il/4d502d/3571433737/il_1588xN.3571433737_ijhy.jpg",
            preview=True
        ),
        "productImage7" : ProductImage(
            product_id=2,
            url="https://i.etsystatic.com/28753344/r/il/6ee9e8/3495607961/il_1588xN.3495607961_rr8y.jpg",
            preview=False
        ),
        "productImage8" : ProductImage(
            product_id=2,
            url="https://i.etsystatic.com/28753344/r/il/a709f9/3496262017/il_1588xN.3496262017_30gl.jpg",
            preview=False
        ),
        "productImage9" : ProductImage(
            product_id=2,
            url="https://i.etsystatic.com/28753344/r/il/e5abce/3447976386/il_1588xN.3447976386_qi0t.jpg",
            preview=False
        ),
        "productImage10" : ProductImage(
            product_id=2,
            url="https://i.etsystatic.com/28753344/r/il/60c20c/3144294776/il_1588xN.3144294776_o0gk.jpg",
            preview=False
        ),
        "productImage11" : ProductImage(
            product_id=3,
            url="https://i.etsystatic.com/32831434/r/il/5026e7/5598313034/il_1588xN.5598313034_sir4.jpg",
            preview=True
        ),
        "productImage12" : ProductImage(
            product_id=3,
            url="https://i.etsystatic.com/32831434/r/il/268978/5598313124/il_1588xN.5598313124_cgme.jpg",
            preview=False
        ),
        "productImage13" : ProductImage(
            product_id=3,
            url="https://i.etsystatic.com/32831434/r/il/388bfd/5598313032/il_1588xN.5598313032_ino9.jpg",
            preview=False
        ),
        "productImage14" : ProductImage(
            product_id=3,
            url="https://i.etsystatic.com/32831434/r/il/ea01ee/5598313044/il_1588xN.5598313044_svo1.jpg",
            preview=False
        ),
        "productImage15" : ProductImage(
            product_id=3,
            url="https://i.etsystatic.com/32831434/r/il/34b213/5598313108/il_1588xN.5598313108_hb8l.jpg",
            preview=False
        ),
        "productImage16" : ProductImage(
            product_id=4,
            url="https://i.etsystatic.com/27146648/r/il/7d557f/3619699794/il_1588xN.3619699794_gv0h.jpg",
            preview=True
        ),
        "productImage17" : ProductImage(
            product_id=4,
            url="https://i.etsystatic.com/27146648/r/il/dc8861/3250937118/il_1588xN.3250937118_b5pd.jpg",
            preview=False
        ),
        "productImage18" : ProductImage(
            product_id=4,
            url="https://i.etsystatic.com/27146648/r/il/9f9cc8/3250937110/il_1588xN.3250937110_lyvi.jpg",
            preview=False
        ),
        "productImage19" : ProductImage(
            product_id=4,
            url="https://i.etsystatic.com/27146648/r/il/43138b/3298623781/il_1588xN.3298623781_el2i.jpg",
            preview=False
        ),
        "productImage20" : ProductImage(
            product_id=4,
            url="https://i.etsystatic.com/27146648/r/il/1aa7dd/3298637483/il_1588xN.3298637483_qeym.jpg",
            preview=False
        ),
        "productImage21" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/aa0df7/4560733552/il_1588xN.4560733552_e91q.jpg",
            preview=True
        ),
        "productImage22" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/2b9062/4608123651/il_1588xN.4608123651_szkv.jpg",
            preview=False
        ),
        "productImage23" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/41c3cb/4608128793/il_1588xN.4608128793_r5u5.jpg",
            preview=False
        ),
        "productImage24" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/c3be90/4622888988/il_1588xN.4622888988_ktrm.jpg",
            preview=False
        ),
        "productImage25" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/286405/4608123697/il_1588xN.4608123697_r5a2.jpg",
            preview=False
        ),
        "productImage26" : ProductImage(
            product_id=5,
            url="https://i.etsystatic.com/39150139/r/il/286405/4608123697/il_1588xN.4608123697_r5a2.jpg",
            preview=False
        ),
        "productImage27" : ProductImage(
            product_id=6,
            url="https://i.etsystatic.com/23915349/r/il/80c9ee/4809170375/il_1588xN.4809170375_hhsd.jpg",
            preview=True
        ),
        "productImage28" : ProductImage(
            product_id=6,
            url="https://i.etsystatic.com/23915349/r/il/cbc5f8/4809170459/il_1588xN.4809170459_4i7d.jpg",
            preview=False
        ),
        "productImage29" : ProductImage(
            product_id=6,
            url="https://i.etsystatic.com/23915349/r/il/250c0b/4810251739/il_1588xN.4810251739_itxv.jpg",
            preview=False
        ),
        "productImage30" : ProductImage(
            product_id=6,
            url="https://i.etsystatic.com/23915349/r/il/9c0775/4380753920/il_1588xN.4380753920_dhpx.jpg",
            preview=False
        ),
        "productImage31" : ProductImage(
            product_id=6,
            url="https://i.etsystatic.com/23915349/r/il/e236b6/4740497457/il_1588xN.4740497457_ctcg.jpg",
            preview=False
        ),
        "productImage32" : ProductImage(
            product_id=7,
            url="https://i.etsystatic.com/38256619/r/il/c4a304/4551491388/il_1588xN.4551491388_kvrw.jpg",
            preview=True
        ),
        "productImage33" : ProductImage(
            product_id=7,
            url="https://i.etsystatic.com/38256619/r/il/f61e3b/4551487986/il_1588xN.4551487986_bax2.jpg",
            preview=False
        ),
        "productImage34" : ProductImage(
            product_id=7,
            url="https://i.etsystatic.com/38256619/r/il/c9da28/4598879849/il_1588xN.4598879849_l91o.jpg",
            preview=False
        ),
        "productImage35" : ProductImage(
            product_id=7,
            url="https://i.etsystatic.com/38256619/r/il/9caf6e/4598879259/il_1588xN.4598879259_rjea.jpg",
            preview=False
        ),
        "productImage36" : ProductImage(
            product_id=7,
            url="https://i.etsystatic.com/38256619/r/il/662c95/4496942079/il_1588xN.4496942079_rknu.jpg",
            preview=False
        ),
        "productImage37" : ProductImage(
            product_id=8,
            url="https://i.etsystatic.com/17309817/r/il/c25ed0/4713790399/il_1588xN.4713790399_rq6n.jpg",
            preview=True
        ),
        "productImage38" : ProductImage(
            product_id=8,
            url="https://i.etsystatic.com/17309817/r/il/e98d8e/4654831804/il_1588xN.4654831804_b6kx.jpg",
            preview=False
        ),
        "productImage39" : ProductImage(
            product_id=8,
            url="https://i.etsystatic.com/17309817/r/il/f87303/4703070317/il_1588xN.4703070317_1mrj.jpg",
            preview=False
        ),
        "productImage40" : ProductImage(
            product_id=8,
            url="https://i.etsystatic.com/17309817/r/il/697bdc/4703070071/il_1588xN.4703070071_toc5.jpg",
            preview=False
        ),
        "productImage41" : ProductImage(
            product_id=8,
            url="https://i.etsystatic.com/17309817/r/il/0dae57/3831886852/il_1588xN.3831886852_fx49.jpg",
            preview=False
        ),
        "productImage42" : ProductImage(
            product_id=9,
            url="https://i.etsystatic.com/9021667/r/il/a5c520/2533305215/il_1588xN.2533305215_50pf.jpg",
            preview=True
        ),
        "productImage43" : ProductImage(
            product_id=9,
            url="https://i.etsystatic.com/9021667/r/il/a62808/2485634148/il_1588xN.2485634148_np2t.jpg",
            preview=False
        ),
        "productImage44" : ProductImage(
            product_id=9,
            url="https://i.etsystatic.com/9021667/r/il/c6630f/2533307371/il_1588xN.2533307371_fgdy.jpg",
            preview=False
        ),
        "productImage45" : ProductImage(
            product_id=9,
            url="https://i.etsystatic.com/9021667/r/il/fb75f3/2533303557/il_1588xN.2533303557_gn4j.jpg",
            preview=False
        ),
        "productImage46" : ProductImage(
            product_id=9,
            url="https://i.etsystatic.com/9021667/r/il/f7c2db/2533305145/il_1588xN.2533305145_snvu.jpg",
            preview=False
        ),
        "productImage47" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/e31eaf/4729118167/il_1588xN.4729118167_o1m2.jpg",
            preview=True
        ),
        "productImage48" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/e761fd/4729118371/il_1588xN.4729118371_ptqv.jpg",
            preview=False
        ),
        "productImage49" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/ecc37f/4680890396/il_1588xN.4680890396_dgl0.jpg",
            preview=False
        ),
        "productImage50" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/8f7c6d/4680890288/il_1588xN.4680890288_khwp.jpg",
            preview=False
        ),
        "productImage51" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/11917e/4680890132/il_1588xN.4680890132_6i6n.jpg",
            preview=False
        ),
        "productImage52" : ProductImage(
            product_id=10,
            url="https://i.etsystatic.com/41630068/r/il/11917e/4680890132/il_1588xN.4680890132_6i6n.jpg",
            preview=False
        ),
        "productImage53" : ProductImage(
            product_id=11,
            url="https://i.etsystatic.com/43123695/r/il/86d40a/5055099484/il_1588xN.5055099484_985w.jpg",
            preview=True
        ),
        "productImage54" : ProductImage(
            product_id=11,
            url="https://i.etsystatic.com/43123695/r/il/c42ff2/5103329473/il_1588xN.5103329473_kukd.jpg",
            preview=False
        ),
        "productImage55" : ProductImage(
            product_id=11,
            url="https://i.etsystatic.com/43123695/r/il/ae129c/5055098686/il_1588xN.5055098686_gy1i.jpg",
            preview=False
        ),
        "productImage56" : ProductImage(
            product_id=12,
            url="https://i.etsystatic.com/25535242/r/il/70d4f1/3218767834/il_1588xN.3218767834_3zyz.jpg",
            preview=True
        ),
        "productImage57" : ProductImage(
            product_id=12,
            url="https://i.etsystatic.com/25535242/r/il/47f124/3274900485/il_1588xN.3274900485_n83x.jpg",
            preview=False
        ),
        "productImage58" : ProductImage(
            product_id=13,
            url="https://i.etsystatic.com/5440602/r/il/21895b/2896486335/il_1588xN.2896486335_m25x.jpg",
            preview=True
        ),
        "productImage59" : ProductImage(
            product_id=13,
            url="https://i.etsystatic.com/5440602/r/il/b40911/2896486741/il_1588xN.2896486741_idzw.jpg",
            preview=False
        ),
        "productImage60" : ProductImage(
            product_id=14,
            url="https://i.etsystatic.com/15217470/r/il/780cdf/5758087126/il_1588xN.5758087126_kxso.jpg",
            preview=True
        ),
        "productImage61" : ProductImage(
            product_id=14,
            url="https://i.etsystatic.com/15217470/r/il/488bae/5758087200/il_1588xN.5758087200_3xyr.jpg",
            preview=False
        ),
        "productImage62" : ProductImage(
            product_id=15,
            url="https://i.etsystatic.com/6207870/r/il/189da3/4397337031/il_1588xN.4397337031_m233.jpg",
            preview=True
        ),
        "productImage63" : ProductImage(
            product_id=15,
            url="https://i.etsystatic.com/6207870/r/il/316fe7/4397337019/il_1588xN.4397337019_otne.jpg",
            preview=False
        ),
        "productImage64" : ProductImage(
            product_id=16,
            url="https://i.etsystatic.com/19985277/r/il/091c9a/4808281464/il_1588xN.4808281464_bovs.jpg",
            preview=True
        ),
        "productImage65" : ProductImage(
            product_id=16,
            url="https://i.etsystatic.com/19985277/r/il/9bc445/4856553265/il_1588xN.4856553265_6xg7.jpg",
            preview=False
        ),
        "productImage66" : ProductImage(
            product_id=17,
            url="https://i.etsystatic.com/21165138/r/il/c739db/4649564940/il_1588xN.4649564940_i4tg.jpg",
            preview=True
        ),
        "productImage67" : ProductImage(
            product_id=17,
            url="https://i.etsystatic.com/21165138/r/il/747783/4452696726/il_1588xN.4452696726_desc.jpg",
            preview=False
        ),
        "productImage68" : ProductImage(
            product_id=18,
            url="https://i.etsystatic.com/7980880/r/il/9f0ffc/2522607488/il_1588xN.2522607488_ey54.jpg",
            preview=True
        ),
        "productImage69" : ProductImage(
            product_id=18,
            url="https://i.etsystatic.com/7980880/r/il/1f7b31/2570262619/il_1588xN.2570262619_roce.jpg",
            preview=False
        ),
        "productImage70" : ProductImage(
            product_id=19,
            url="https://i.etsystatic.com/19989255/r/il/aa5286/4046018789/il_1588xN.4046018789_gbm2.jpg",
            preview=True
        ),
        "productImage71" : ProductImage(
            product_id=19,
            url="https://i.etsystatic.com/19989255/r/il/d10810/4046018779/il_1588xN.4046018779_627y.jpg",
            preview=False
        ),
        "productImage72" : ProductImage(
            product_id=20,
            url="https://i.etsystatic.com/22034213/r/il/92133e/5843392551/il_1588xN.5843392551_pn1x.jpg",
            preview=True
        ),
        "productImage73" : ProductImage(
            product_id=20,
            url="https://i.etsystatic.com/22034213/r/il/3db5d3/5843393279/il_1588xN.5843393279_1yzq.jpg",
            preview=False
        ),
        "productImage74" : ProductImage(
            product_id=21,
            url="https://i.etsystatic.com/10794702/r/il/d82566/5892331099/il_1588xN.5892331099_sk3u.jpg",
            preview=True
        ),
        "productImage75" : ProductImage(
            product_id=21,
            url="https://i.etsystatic.com/10794702/r/il/d82566/5892331099/il_1588xN.5892331099_sk3u.jpg",
            preview=False
        ),
        "productImage76" : ProductImage(
            product_id=22,
            url="https://i.etsystatic.com/15598267/r/il/3098a4/3760969497/il_1588xN.3760969497_f4m6.jpg",
            preview=True
        ),
        "productImage77" : ProductImage(
            product_id=22,
            url="https://i.etsystatic.com/5836616/r/il/896e41/3881157991/il_1588xN.3881157991_orsl.jpg",
            preview=False
        ),
        "productImage78" : ProductImage(
            product_id=23,
            url="https://i.etsystatic.com/19721251/r/il/2f5959/4051689581/il_1588xN.4051689581_ge5x.jpg",
            preview=True
        ),
        "productImage79" : ProductImage(
            product_id=23,
            url="https://i.etsystatic.com/19721251/r/il/89f611/4901911144/il_1588xN.4901911144_4sf4.jpg",
            preview=False
        ),
        "productImage80" : ProductImage(
            product_id=24,
            url="https://i.etsystatic.com/45001447/r/il/7c9328/5589872751/il_1588xN.5589872751_5x8y.jpg",
            preview=True
        ),
        "productImage81" : ProductImage(
            product_id=24,
            url="https://i.etsystatic.com/45001447/r/il/4b7ecc/5589872815/il_1588xN.5589872815_d3jn.jpg",
            preview=False
        ),
        "productImage82" : ProductImage(
            product_id=25,
            url="https://i.etsystatic.com/19643087/r/il/62c52a/2266514750/il_1588xN.2266514750_2s6g.jpg",
            preview=True
        ),
        "productImage83" : ProductImage(
            product_id=25,
            url="https://i.etsystatic.com/19643087/r/il/85b267/3220994507/il_1588xN.3220994507_smbo.jpg",
            preview=False
        ),
        "productImage84" : ProductImage(
            product_id=26,
            url="https://i.etsystatic.com/20610144/r/il/0f44fa/5904976626/il_1588xN.5904976626_7swp.jpg",
            preview=True
        ),
        "productImage85" : ProductImage(
            product_id=26,
            url="https://i.etsystatic.com/20610144/r/il/516d09/5953059223/il_1588xN.5953059223_pdap.jpg",
            preview=False
        ),
        "productImage86" : ProductImage(
            product_id=27,
            url="https://i.etsystatic.com/5572559/r/il/2c216e/4985776753/il_1588xN.4985776753_kr1l.jpg",
            preview=True
        ),
        "productImage87" : ProductImage(
            product_id=27,
            url="https://i.etsystatic.com/5572559/r/il/cf4c88/4109045582/il_1588xN.4109045582_r63d.jpg",
            preview=False
        ),
        "productImage88" : ProductImage(
            product_id=28,
            url="https://i.etsystatic.com/6907859/r/il/daaa9a/2676481946/il_1588xN.2676481946_f7v5.jpg",
            preview=True
        ),
        "productImage89" : ProductImage(
            product_id=28,
            url="https://i.etsystatic.com/6907859/r/il/42c09f/2676479948/il_1588xN.2676479948_lc4u.jpg",
            preview=False
        ),
        "productImage90" : ProductImage(
            product_id=29,
            url="https://i.etsystatic.com/36187006/r/il/c1f1e5/5402358738/il_1588xN.5402358738_sk8b.jpg",
            preview=True
        ),
        "productImage91" : ProductImage(
            product_id=29,
            url="https://i.etsystatic.com/36187006/r/il/a33cd9/4735403772/il_1588xN.4735403772_oepc.jpg",
            preview=False
        ),
        "productImage92" : ProductImage(
            product_id=30,
            url="https://i.etsystatic.com/31665081/r/il/58301b/4448331932/il_1588xN.4448331932_c4e4.jpg",
            preview=True
        ),
        "productImage93" : ProductImage(
            product_id=30,
            url="https://i.etsystatic.com/31665081/r/il/cb8de4/4495675157/il_1588xN.4495675157_2koq.jpg",
            preview=False
        ),
        "productImage94" : ProductImage(
            product_id=31,
            url="https://i.etsystatic.com/23020900/r/il/cae9e9/5703370121/il_1588xN.5703370121_gi3d.jpg",
            preview=True
        ),
        "productImage95" : ProductImage(
            product_id=31,
            url="https://i.etsystatic.com/23020900/r/il/6f2006/5703291901/il_1588xN.5703291901_6lr6.jpg",
            preview=False
        ),
        "productImage96" : ProductImage(
            product_id=32,
            url="https://i.etsystatic.com/16782045/r/il/53f22b/4798175656/il_1588xN.4798175656_jn6i.jpg",
            preview=True
        ),
        "productImage97" : ProductImage(
            product_id=32,
            url="https://i.etsystatic.com/16782045/r/il/8deccf/4822745708/il_1588xN.4822745708_lcv6.jpg",
            preview=False
        ),
        "productImage98" : ProductImage(
            product_id=33,
            url="https://i.etsystatic.com/21674059/r/il/3848e9/5638637940/il_1588xN.5638637940_l8pf.jpg",
            preview=True
        ),
        "productImage99" : ProductImage(
            product_id=33,
            url="https://i.etsystatic.com/21674059/r/il/aede07/5637579546/il_1588xN.5637579546_cjmi.jpg",
            preview=False
        ),
        "productImage100" : ProductImage(
            product_id=34,
            url="https://i.etsystatic.com/28695890/r/il/085a3d/5722582377/il_1588xN.5722582377_delh.jpg",
            preview=True
        ),
        "productImage101" : ProductImage(
            product_id=34,
            url="https://i.etsystatic.com/28695890/r/il/4ca174/5722580851/il_1588xN.5722580851_ifm1.jpg",
            preview=False
        ),
        "productImage102" : ProductImage(
            product_id=35,
            url="https://i.etsystatic.com/21536520/r/il/b849aa/3707441288/il_1588xN.3707441288_b7kh.jpg",
            preview=True
        ),
        "productImage103" : ProductImage(
            product_id=35,
            url="https://i.etsystatic.com/21536520/r/il/6f36a4/3707436294/il_1588xN.3707436294_dld0.jpg",
            preview=False
        ),
        "productImage104" : ProductImage(
            product_id=36,
            url="https://i.etsystatic.com/34214424/r/il/c01aa6/3641398218/il_1588xN.3641398218_td2s.jpg",
            preview=True
        ),
        "productImage105" : ProductImage(
            product_id=36,
            url="https://i.etsystatic.com/34214424/r/il/8fd3ea/3689000803/il_1588xN.3689000803_g575.jpg",
            preview=False
        ),
        "productImage106" : ProductImage(
            product_id=37,
            url="https://i.etsystatic.com/6641405/r/il/b8e08e/3270464773/il_1588xN.3270464773_k98m.jpg",
            preview=True
        ),
        "productImage107" : ProductImage(
            product_id=37,
            url="https://i.etsystatic.com/6641405/r/il/cc77bf/4639552911/il_1588xN.4639552911_p4kk.jpg",
            preview=False
        ),
        "productImage108" : ProductImage(
            product_id=38,
            url="https://i.etsystatic.com/40331343/r/il/f7e7c0/5824901233/il_1588xN.5824901233_kmqx.jpg",
            preview=True
        ),
        "productImage109" : ProductImage(
            product_id=38,
            url="https://i.etsystatic.com/40331343/r/il/4dfa7c/5824904079/il_1588xN.5824904079_khd4.jpg",
            preview=False
        ),
        "productImage110" : ProductImage(
            product_id=39,
            url="https://i.etsystatic.com/27968870/r/il/5910c8/2936784581/il_1588xN.2936784581_l0z2.jpg",
            preview=True
        ),
        "productImage111" : ProductImage(
            product_id=39,
            url="https://i.etsystatic.com/27968870/r/il/08a5b9/2936784563/il_1588xN.2936784563_sa0l.jpg",
            preview=False
        ),
        "productImage112" : ProductImage(
            product_id=40,
            url="https://i.etsystatic.com/51203617/r/il/892bc5/5873722220/il_1588xN.5873722220_adq7.jpg",
            preview=True
        ),
        "productImage113" : ProductImage(
            product_id=40,
            url="https://i.etsystatic.com/51203617/r/il/233037/5921817457/il_1588xN.5921817457_7m28.jpg",
            preview=False
        ),
    }

    for key, product_image in product_images_data.items():
        db.session.add(product_image)


    db.session.commit()




def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;"),
    else:
        db.session.execute(text("DELETE FROM product_images"),),

    db.session.commit(),
