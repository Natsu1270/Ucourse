import os
import zipfile
from io import BytesIO


def generate_zip_file(file_paths, directory):
    zip_filename = "{0}.zip".format(directory)
    in_memory = BytesIO()
    zip_file = zipfile.ZipFile(in_memory, 'w')
    for file_path in file_paths:
        file_dir, file_name = os.path.split(file_path)
        zip_path = os.path.join(directory, file_name)
        zip_file.write(file_path, zip_path)

    zip_file.close()

    return zip_filename, in_memory


def generate_zip_all(list_student_assignment, filename):
    zip_filename = "{0}.zip".format(filename)
    in_memory = BytesIO()
    zip_file = zipfile.ZipFile(in_memory, 'w')

    for student_assignment in list_student_assignment:

        directory = student_assignment.student.username
        submit_files = student_assignment.student_assignment_files.all()
        submit_file_paths = [file.file.path for file in submit_files]

        for file_path in submit_file_paths:
            file_dir, file_name = os.path.split(file_path)
            zip_path = os.path.join(directory, file_name)
            zip_file.write(file_path, zip_path)

    zip_file.close()

    return zip_filename, in_memory
