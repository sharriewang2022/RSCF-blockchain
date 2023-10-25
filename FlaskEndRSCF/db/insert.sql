-----------USER--------------
insert into USER (ID, UserID, UserName, UserPassword, FirstName, LastName, RoleID, Email, Telephone, CreateDate)
values('001', '001', 'sa', 1, 'saFirst', 'saLast', '3001', '@', '020999','2023-10-17');

-----------------------------MENU---------------------------
delete from menu;
insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1001','Administration module','AdminView','/admin','Administate',null,'System management module','2023-09-25');

insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1002','Category Module','CategoryView','/category','Category',null,'Category management module','2023-09-25');

insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1003','Product Module','ProductView','/prodcut','Product',null,'Product management module','2023-09-25');

insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1004','Order Module','OrderView','/order','Order',null,'Order management module','2023-09-25');

insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1005','Document Module','DocumentView','/file','DRM Document',null,'Document manage module','2023-09-25');

insert into MENU (MenuID, MenuName, Component, Path, Label, ParentID, Description, CreateDate)
values('1006','Trace Module','TrackProductView','/trackProduct','TrackProduct',null,'Trace management module','2023-09-25');

-----------------------------Role---------------------------
insert into Role (RoleID, RoleName, Description, CreateDate)
values('3001','Administrator','System administrator','2023-09-25');

insert into Role (RoleID, RoleName, Description, CreateDate)
values('3002','Supplier','Raw material supplier','2023-09-25');

insert into Role (RoleID, RoleName, Description, CreateDate)
values('3003','manufacturer','Product manufacturer','2023-09-25');

insert into Role (RoleID, RoleName, Description, CreateDate)
values('3004','distributor','distributor','2023-09-25');

insert into Role (RoleID, RoleName, Description, CreateDate)
values('3005','retailer','retailer','2023-09-25');

insert into Role (RoleID, RoleName, Description, CreateDate)
values('3006','customer','end user','2023-09-25');

------------------------role_permission-------------------
--Administrator
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1001','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1002','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1003','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1004','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1005','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3001','1006','Y','2023-09-25');

--Supplier
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3002','1004','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3002','1005','Y','2023-09-25');

--manufacturer
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3003','1002','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3003','1003','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3003','1004','Y','2023-09-25');

--distributor
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3004','1004','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3004','1005','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3004','1006','Y','2023-09-25');

--retailer
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3005','1004','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3005','1005','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3005','1006','Y','2023-09-25');

--customer
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3006','1004','Y','2023-09-25');
insert into role_permission (RoleID, MenuID, Permission, CreateDate)
values('3006','1006','Y','2023-09-25');



-----------------------------------