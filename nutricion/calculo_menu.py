# (kcal, prot, carb, fat) por porción indicada
F={
'huevo':(72,6.3,0.4,5),'pan60':(150,6,27,2),'pan30':(75,3,13.5,1),'tomate':(20,1,4,0),
'cafe':(46,3.2,4.8,1.6),'palta1/4':(65,0.8,1,6.5),'yogP':(95,15,7,0.3),
'manzana':(80,0.4,21,0.3),'kiwi':(45,0.8,10,0.4),'pera':(85,0.5,22,0.2),'naranja':(65,1.3,15,0.2),
'cottage100':(98,11,3.4,4.3),'platano1/2':(55,0.7,13,0.2),'almendra10':(58,2.1,2,5),'nuez15':(98,2.3,2,9.8),
'molida120':(210,24,0,12.6),'fideos150c':(225,9,45,1.5),'salsa100':(50,1.5,9,1),'champ':(15,2,1,0),
'merluza120':(85,19,0,1),'papa100':(77,2,17,0.1),'brocoli100':(35,2.8,7,0.4),'zanahoria100':(41,1,10,0.2),
'salmon130':(270,26,0,18),'atun100':(110,25,0,1),'ensalada':(25,1.5,4,0.3),'lentejas200':(232,18,40,0.8),
'verduras200':(60,3,10,0.5),'espinacas':(15,1.8,2,0.2),'pollo130':(156,29,0,3.6),'calab_champ200':(35,3,5,0.4),
'judias':(30,1.8,6,0.2),'quesofresco50':(115,7,1.5,9),'quesofresco30':(70,4.2,1,5.4),'yogur125':(70,4.5,6,3),
'quinoa150c':(180,6.6,32,2.9),'pescblanco120':(90,20,0,1),'pure_calab200':(70,2,16,0.2),'garbanzos200':(328,18,55,5),
}
D={
'Lunes':['huevo','huevo','pan60','tomate','cafe','yogP','manzana','molida120','fideos150c','salsa100','champ','platano1/2','cottage100','merluza120',('papa100',1.5),('brocoli100',2)],
'Martes':['huevo','huevo','pan60','palta1/4','cafe','yogP','kiwi','salmon130',('papa100',1.8),('brocoli100',1.5),'zanahoria100','platano1/2','almendra10','atun100','huevo','ensalada','pan30'],
'Miércoles':['huevo','huevo','espinacas','pan60','yogP','pera','lentejas200','verduras200','huevo','cottage100','platano1/2','pollo130',('papa100',1.2),'calab_champ200'],
'Jueves':['huevo','huevo','pan60','tomate','yogP','naranja','atun100',('papa100',1.8),'judias','huevo','pan30','quesofresco50','huevo','huevo','calab_champ200','espinacas','ensalada','yogur125'],
'Viernes':['huevo','huevo','pan60','palta1/4','yogP','manzana','molida120','quinoa150c','verduras200','platano1/2','cottage100','pescblanco120','pure_calab200','papa100'],
'Sábado':['huevo','huevo','pan60','tomate','yogP','kiwi','garbanzos200','espinacas','zanahoria100','tomate','ensalada','cottage100','platano1/2','pollo130',('papa100',1.5),'verduras200'],
'Domingo':['huevo','huevo','pan60','quesofresco30','cafe','yogP','naranja','salmon130','quinoa150c','verduras200','platano1/2','nuez15','atun100','tomate','ensalada',('papa100',1.2)],
}
tot=[0]*4
for d,items in D.items():
  s=[0]*4
  for it in items:
    k,m=(it,1) if isinstance(it,str) else it
    for i in range(4): s[i]+=F[k][i]*m
  tot=[a+b for a,b in zip(tot,s)]
  print(f"{d:10} {s[0]:6.0f} kcal  P {s[1]:5.0f}  C {s[2]:5.0f}  G {s[3]:5.0f}")
print(f"{'Promedio':10} {tot[0]/7:6.0f} kcal  P {tot[1]/7:5.0f}  C {tot[2]/7:5.0f}  G {tot[3]/7:5.0f}")
