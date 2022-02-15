# UNICON SOFT

# URL = localhost:777

# Login dan boshqa hammasini headers dan token bervorish shart

# POST (LOGIN)

1. url/v1/auth/login - body : { username, password } -- token va user qaytaradi

# GET

1. url/v1/api/admin -- roles, organisations, users, allStatistics qaytaradi faqat o'zi yaratganlarini
2. url/v1/api/leader -- projects, tasks, workers, organisations qaytaradi faqat o'zini organizatsiyasiga tegishlilarini
3. url/v1/api/worker -- projects, tasks qaytaradi faqat o'ziga tegishlilarini

# POST

1. url/v1/api/register - body : { name, username, password, roleId, organisationId } -- regiteratsiya qilingan userni qaytaradi
2. url/v1/api/referenses - body : { organisationId, userId } -- org yaga worker yoki leader lani qo'shadi
3. url/v1/api/organization - body : { name } -- yatatilgan org ni qaytaradi
4. url/v1/api/project - body : { name, orgId } -- yatatilgan project ni qaytaradi
5. url/v1/api/task - body : { name, time, projectId, workerId } -- yatatilgan task ni qaytaradi

# PUT

1. url/v1/api/role/{userId} - body : { roleId } -- userni rolini o'zgartiradi va o'zgarganini qaytaradi
2. url/v1/api/organization/{orgId} - body : { name } -- org ni nomini o'zgartiradi va o'zgarganini qaytaradi
3. url/v1/api/project/{projectId} - body : { name } -- project ni nomini o'zgartiradi va o'zgarganini qaytaradi
4. url/v1/api/task/{taskId} - body : { name, time, projectId, workerId } -- task ni o'zgartiradi va o'zgarganini qaytaradi
5. url/v1/api/worker/{taskId} - body : { start } -- project ni boshlidi va boshlanish vohti yoziladi va o'zgarganini qaytaradi
6. url/v1/api/worker/{taskId} - body : { end } -- project ni tugatadi va tugash vohti yoziladi va o'zgarganini qaytaradi

# DELETE

1. url/v1/api/admin/{userId} -- db dan o'chiradi va o'chgan id sini qaytaradi
2. url/v1/api/organization/{orgId} -- db dan o'chiradi va o'chgan id sini qaytaradi
3. url/v1/api/project/{projectId} -- db dan o'chiradi va o'chgan id sini qaytaradi
4. url/v1/api/task/{taskId} -- db dan o'chiradi va o'chgan id sini qaytaradi
