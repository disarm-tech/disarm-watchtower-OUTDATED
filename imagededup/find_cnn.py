from imagededup.methods import CNN
from absl import app, flags
from absl.flags import FLAGS
import json

flags.DEFINE_list('image_dirs', None, 'Absolute path to directories for check')
flags.DEFINE_float('min_threshold', 0.9, 'Threshold value (must be float between -1.0 and 1.0). Default is 0.9')
flags.DEFINE_boolean('scores', False, 'Out scores')
flags.mark_flag_as_required('image_dirs')


def main(_) -> bool:
    cnn = CNN()
    encodings = cnn.encode_images_multi(image_dirs=FLAGS.image_dirs)
    duplicates_cnn = cnn.find_duplicates(
        encoding_map=encodings,
        min_similarity_threshold=FLAGS.min_threshold,
        scores=FLAGS.scores)

    print(json.dumps(duplicates_cnn))
    return True


if __name__ == '__main__':
    try:
        app.run(main)
    except SystemExit:
        pass
