# from django_elasticsearch_dsl import fields, Index, Document
#
# from courses.models import Course, CourseDetail
# from users.models import User
# from programs.models import Program, Field
#
# course_index = Index('courses')
# course_index.settings(
#     number_of_shards=1,
#     number_of_replicas=0
# )
#
# @course_index.doc_type
# class CourseDocument(Document):
#     title = fields.TextField(
#         attr='title',
#         fields={'suggest':fields.Completion()}
#     )
#     course_detail = fields.ObjectField(
#         properties={
#             'verbose_name': fields.TextField(),
#             'short_description': fields.TextField(),
#             'benefits': fields.TextField()
#         }
#     )
#     points = fields.IntegerField()
#
#     def prepare_points(self, instance):
#         if instance.level == 'Beginner':
#             return 2
#         return 1
#
#     class Meta:
#         model = Course
#         fields = [
#             'id',
#             'code',
#             'level',
#             'status',
#             'program',
#             'teacher',
#             'field',
#             'created_date',
#             'updated_date',
#             'created_by','created_by_name'
#         ]
#
#         related_models = [CourseDetail,User,Program,Field]
#
